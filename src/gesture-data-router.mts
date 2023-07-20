import { Router, Response, Request, NextFunction } from "express";
import { getParticipantFromUrlCode, getProject, getTrial } from "./database-util.mts";
import { FileHandle, open } from 'node:fs/promises';
import Joi from "joi";
import { GestureDataRequest } from "./models/gesture-data-request.mts";
import multer from "multer";
import path from "node:path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer();

async function verifyGestureDataRequest(req: GestureDataRequest, res: Response, next: NextFunction) {
    const gestureDataSchema = Joi.object({
        project_name: Joi.string().required(),
        participant_id: Joi.string().required(),
        trial_id: Joi.string().required(),
        gesture_index: Joi.number().integer().required(),
        data: Joi.any()
    });

    try {
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

        const file_name = `${project_name}-${participant_id}-${trial_id}-${gesture_index}.csv`;
        req.file_name = file_name.replace(/\/|\\/g, "");

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown server error")
    }
}

const gestureDataRouter = Router();
gestureDataRouter.post("/start-transfer", verifyGestureDataRequest, startTransfer);
gestureDataRouter.post("/append-data", verifyGestureDataRequest, upload.single('data'), sendData);

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
    let fileHandle: FileHandle;
    
    try {
        const filePath = filePathFromFilename(req.file_name);
        fileHandle = await open(filePath, 'a');

        console.log(req.file);
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown error");
    } finally {
        if (fileHandle) fileHandle.close();
    }
}

export { gestureDataRouter };