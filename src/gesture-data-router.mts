import { Router, Response, NextFunction } from "express";
import { getParticipant, getParticipantFromUrlCode, getProject, getTrial } from "./database-util.mts";
import { FileHandle, open } from 'node:fs/promises';
import { GestureDataDownloadRequest, GestureDataRequest } from "./models/gesture-data-request.mts";

import Joi from "joi";
import multer from "multer";
import path from "node:path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { verifyToken } from "./auth.mts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer();

const gestureDataBaseSchema = Joi.object({
    participant_id: Joi.string().required(),
    trial_id: Joi.string().required(),
    gesture_index: Joi.number().integer().required(),
    data: Joi.any()
});

async function verifyGestureDataDownloadRequest(req: GestureDataDownloadRequest, res: Response, next: NextFunction) {
    try {
        Joi.assert(req.body, gestureDataBaseSchema);
    } catch (err) {
        console.log(err.message);
        return res.status(400).send("Request misisng parameters");
    }

    try {
        const { participant_id, trial_id, gesture_index } = req.body;
        const { project_name } = req.user;

        req.project = await getProject(project_name);
        
        if (req.project == null) return res.status(400).send("Unknown project");

        req.participant = getParticipant(req.project, participant_id);

        if (req.participant == null) return res.status(400).send("Unknown participant");

        req.trial = getTrial(req.participant, trial_id);

        if (req.trial == null) return res.status(400).send("No such completed trial");

        if (gesture_index < 0 || req.trial.gestures.length <= gesture_index)
            return res.status(400).send("gesture index is out of bounds")

        try {
            req.gesture = req.trial.gestures[gesture_index];
        } catch (err) {
            return res.status(400).send("Invalid gesture index");
        }

        const file_name = `${project_name}-${participant_id}-${trial_id}-${gesture_index}.csv`;
        req.file_name = file_name.replace(/\/|\\/g, "");

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown server error")
    }
}

async function verifyGestureDataRequest(req: GestureDataRequest, res: Response, next: NextFunction) {
    try {
        const gestureDataSchema = gestureDataBaseSchema.keys({
            project_name: Joi.string().required()
        })
        Joi.assert(req.body, gestureDataSchema);
    } catch (err) {
        console.log(err.message);
        return res.status(400).send("Request misisng parameters");
    }

    try {
        const {project_name, participant_id, trial_id, gesture_index} = req.body;

        req.project = await getProject(project_name);
        
        if (req.project == null) return res.status(400).send("Unknown project");

        req.participant = getParticipantFromUrlCode(req.project, participant_id);

        if (req.participant == null) return res.status(400).send("Unknown participant");

        req.trial = getTrial(req.participant, trial_id);

        if (req.trial == null) return res.status(400).send("Unknown trial");

        if (gesture_index < 0 || req.trial.gestures.length <= gesture_index)
            return res.status(400).send("gesture index is out of bounds")

        try {
            req.gesture = req.trial.gestures[gesture_index];
        } catch (err) {
            return res.status(400).send("Invalid gesture index");
        }

        const file_name = `${project_name}-${req.participant.participant_id}-${trial_id}-${gesture_index}.csv`;
        req.file_name = file_name.replace(/\/|\\/g, "");

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown server error")
    }
}

const gestureDataRouter = Router();
gestureDataRouter.post("/start-transfer", upload.none(), verifyGestureDataRequest, startTransfer);
gestureDataRouter.post("/append-data", upload.single('data'), verifyGestureDataRequest, sendData);
gestureDataRouter.get("/get-gesture", verifyToken, verifyGestureDataDownloadRequest, getGestureData)

function filePathFromFilename(fileName: string): string {
    return path.join(__dirname, '..', 'files', fileName);
}

async function startTransfer(req: GestureDataRequest, res: Response) {
    let fileHandle: FileHandle;

    try {
        const filePath = filePathFromFilename(req.file_name);
        fileHandle = await open(filePath, 'w');
        fileHandle.write("");
        
        return res.status(200).send("transfer started");
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown error");
    } finally {
        if (fileHandle) fileHandle.close();
    }
}

async function sendData(req: GestureDataRequest, res: Response) {
    console.log("received append-data request!");

    let fileHandle: FileHandle;
    
    try {
        const dataArray = Array.from(new Float32Array(req.file.buffer.buffer));
        console.log(dataArray);
        const filePath = filePathFromFilename(req.file_name);
        fileHandle = await open(filePath, 'a');

        while (dataArray.length > 0) {
            const row = dataArray.splice(0, 26).join(",") + "\n";
            fileHandle.appendFile(row);
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown error");
    } finally {
        if (fileHandle) fileHandle.close();
    }
}

async function getGestureData(req: GestureDataDownloadRequest, res: Response) {
    try {
        const filePath = filePathFromFilename(req.file_name);
        res.status(200).sendFile(filePath);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown error");
    } 
}


export { gestureDataRouter };