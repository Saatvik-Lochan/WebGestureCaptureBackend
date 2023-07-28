import { Router, Response, NextFunction } from "express";
import { getCompletedTrial, getParticipant, getParticipantFromUrlCode, getProject, getTrial } from "./database-util.mts";
import { FileHandle, open } from 'node:fs/promises';
import { existsSync } from "node:fs";
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
        const { participant_id, trial_id, gesture_index } = req.params;
        const { project_name } = req.user;

        const file_name = `${project_name}-${participant_id}-${trial_id}-${gesture_index}.csv`;
        req.file_name = file_name.replace(/\/|\\/g, "");

        console.log(`requesting file: ${req.file_name}`)
        if (!existsSync(filePathFromFilename(req.file_name))) {
            return res.status(400).send("This gesture has not been completed or does not exist");
        }

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
        return res.status(400).send("Request is misisng parameters");
    }

    try {
        const {project_name, participant_id, trial_id, gesture_index} = req.body;
        
        req.project = await getProject(project_name);
        
        if (req.project == null) return res.status(400).send("Unknown project");
        
        req.participant = getParticipantFromUrlCode(req.project, participant_id);
        
        if (req.participant == null) return res.status(400).send("Unknown participant");
        
        console.log(req.participant)
        console.log(trial_id);
        req.trial = getTrial(req.participant, trial_id);
        
        console.log(req.trial);
        if (req.trial == null) return res.status(400).send("Unknown trial");
        console.log("I reached here");
        
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
gestureDataRouter.get("/get-gesture/:participant_id/:trial_id/:gesture_index", 
        verifyToken, verifyGestureDataDownloadRequest, getGestureData)

function filePathFromFilename(fileName: string): string {
    return path.join(__dirname, '..', 'files', fileName);
}

async function startTransfer(req: GestureDataRequest, res: Response) {
    let fileHandle: FileHandle;

    try {
        const filePath = filePathFromFilename(req.file_name);
        fileHandle = await open(filePath, 'w');
        fileHandle.write(getHeader());
        
        return res.status(200).send("transfer started");
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown error");
    } finally {
        if (fileHandle) fileHandle.close();
    }

    // find a way to not call this (and also not have to load entire file to repopulate it)
    function getHeader() {
        return "l0-pos-x,l0-pos-y,l0-pos-z,l0-quat-x,l0-quat-y,l0-quat-z,l0-quat-w,l1-pos-x,l1-pos-y,l1-pos-z,l1-quat-x,l1-quat-y,l1-quat-z,l1-quat-w,l2-pos-x,l2-pos-y,l2-pos-z,l2-quat-x,l2-quat-y,l2-quat-z,l2-quat-w,l3-pos-x,l3-pos-y,l3-pos-z,l3-quat-x,l3-quat-y,l3-quat-z,l3-quat-w,l4-pos-x,l4-pos-y,l4-pos-z,l4-quat-x,l4-quat-y,l4-quat-z,l4-quat-w,l5-pos-x,l5-pos-y,l5-pos-z,l5-quat-x,l5-quat-y,l5-quat-z,l5-quat-w,l6-pos-x,l6-pos-y,l6-pos-z,l6-quat-x,l6-quat-y,l6-quat-z,l6-quat-w,l7-pos-x,l7-pos-y,l7-pos-z,l7-quat-x,l7-quat-y,l7-quat-z,l7-quat-w,l8-pos-x,l8-pos-y,l8-pos-z,l8-quat-x,l8-quat-y,l8-quat-z,l8-quat-w,l9-pos-x,l9-pos-y,l9-pos-z,l9-quat-x,l9-quat-y,l9-quat-z,l9-quat-w,l10-pos-x,l10-pos-y,l10-pos-z,l10-quat-x,l10-quat-y,l10-quat-z,l10-quat-w,l11-pos-x,l11-pos-y,l11-pos-z,l11-quat-x,l11-quat-y,l11-quat-z,l11-quat-w,l12-pos-x,l12-pos-y,l12-pos-z,l12-quat-x,l12-quat-y,l12-quat-z,l12-quat-w,l13-pos-x,l13-pos-y,l13-pos-z,l13-quat-x,l13-quat-y,l13-quat-z,l13-quat-w,l14-pos-x,l14-pos-y,l14-pos-z,l14-quat-x,l14-quat-y,l14-quat-z,l14-quat-w,l15-pos-x,l15-pos-y,l15-pos-z,l15-quat-x,l15-quat-y,l15-quat-z,l15-quat-w,l16-pos-x,l16-pos-y,l16-pos-z,l16-quat-x,l16-quat-y,l16-quat-z,l16-quat-w,l17-pos-x,l17-pos-y,l17-pos-z,l17-quat-x,l17-quat-y,l17-quat-z,l17-quat-w,l18-pos-x,l18-pos-y,l18-pos-z,l18-quat-x,l18-quat-y,l18-quat-z,l18-quat-w,l19-pos-x,l19-pos-y,l19-pos-z,l19-quat-x,l19-quat-y,l19-quat-z,l19-quat-w,l20-pos-x,l20-pos-y,l20-pos-z,l20-quat-x,l20-quat-y,l20-quat-z,l20-quat-w,l21-pos-x,l21-pos-y,l21-pos-z,l21-quat-x,l21-quat-y,l21-quat-z,l21-quat-w,l22-pos-x,l22-pos-y,l22-pos-z,l22-quat-x,l22-quat-y,l22-quat-z,l22-quat-w,l23-pos-x,l23-pos-y,l23-pos-z,l23-quat-x,l23-quat-y,l23-quat-z,l23-quat-w,l24-pos-x,l24-pos-y,l24-pos-z,l24-quat-x,l24-quat-y,l24-quat-z,l24-quat-w,r0-pos-x,r0-pos-y,r0-pos-z,r0-quat-x,r0-quat-y,r0-quat-z,r0-quat-w,r1-pos-x,r1-pos-y,r1-pos-z,r1-quat-x,r1-quat-y,r1-quat-z,r1-quat-w,r2-pos-x,r2-pos-y,r2-pos-z,r2-quat-x,r2-quat-y,r2-quat-z,r2-quat-w,r3-pos-x,r3-pos-y,r3-pos-z,r3-quat-x,r3-quat-y,r3-quat-z,r3-quat-w,r4-pos-x,r4-pos-y,r4-pos-z,r4-quat-x,r4-quat-y,r4-quat-z,r4-quat-w,r5-pos-x,r5-pos-y,r5-pos-z,r5-quat-x,r5-quat-y,r5-quat-z,r5-quat-w,r6-pos-x,r6-pos-y,r6-pos-z,r6-quat-x,r6-quat-y,r6-quat-z,r6-quat-w,r7-pos-x,r7-pos-y,r7-pos-z,r7-quat-x,r7-quat-y,r7-quat-z,r7-quat-w,r8-pos-x,r8-pos-y,r8-pos-z,r8-quat-x,r8-quat-y,r8-quat-z,r8-quat-w,r9-pos-x,r9-pos-y,r9-pos-z,r9-quat-x,r9-quat-y,r9-quat-z,r9-quat-w,r10-pos-x,r10-pos-y,r10-pos-z,r10-quat-x,r10-quat-y,r10-quat-z,r10-quat-w,r11-pos-x,r11-pos-y,r11-pos-z,r11-quat-x,r11-quat-y,r11-quat-z,r11-quat-w,r12-pos-x,r12-pos-y,r12-pos-z,r12-quat-x,r12-quat-y,r12-quat-z,r12-quat-w,r13-pos-x,r13-pos-y,r13-pos-z,r13-quat-x,r13-quat-y,r13-quat-z,r13-quat-w,r14-pos-x,r14-pos-y,r14-pos-z,r14-quat-x,r14-quat-y,r14-quat-z,r14-quat-w,r15-pos-x,r15-pos-y,r15-pos-z,r15-quat-x,r15-quat-y,r15-quat-z,r15-quat-w,r16-pos-x,r16-pos-y,r16-pos-z,r16-quat-x,r16-quat-y,r16-quat-z,r16-quat-w,r17-pos-x,r17-pos-y,r17-pos-z,r17-quat-x,r17-quat-y,r17-quat-z,r17-quat-w,r18-pos-x,r18-pos-y,r18-pos-z,r18-quat-x,r18-quat-y,r18-quat-z,r18-quat-w,r19-pos-x,r19-pos-y,r19-pos-z,r19-quat-x,r19-quat-y,r19-quat-z,r19-quat-w,r20-pos-x,r20-pos-y,r20-pos-z,r20-quat-x,r20-quat-y,r20-quat-z,r20-quat-w,r21-pos-x,r21-pos-y,r21-pos-z,r21-quat-x,r21-quat-y,r21-quat-z,r21-quat-w,r22-pos-x,r22-pos-y,r22-pos-z,r22-quat-x,r22-quat-y,r22-quat-z,r22-quat-w,r23-pos-x,r23-pos-y,r23-pos-z,r23-quat-x,r23-quat-y,r23-quat-z,r23-quat-w,r24-pos-x,r24-pos-y,r24-pos-z,r24-quat-x,r24-quat-y,r24-quat-z,r24-quat-w,startTime,endTime\n"
    }
}

async function sendData(req: GestureDataRequest, res: Response) {
    console.log("received append-data request!");

    let fileHandle: FileHandle;
    
    try {
        const dataArray = Array.from(new Float32Array(req.file.buffer.buffer));
        console.log(dataArray.length);
        const filePath = filePathFromFilename(req.file_name);
        fileHandle = await open(filePath, 'a');

        while (dataArray.length > 352) {
            const row = dataArray.splice(0, 352).join(",") + "\n";
            fileHandle.appendFile(row);
        }

        fileHandle.appendFile(dataArray.join(","));
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