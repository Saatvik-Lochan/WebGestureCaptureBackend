import { Router, Response, NextFunction } from "express";
import { getParticipantFromUrlCode, getProject, getTrial } from "./database-util.mts";
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
gestureDataRouter.get("/get-gesture/:participant_id/:trial_id/:gesture_index", 
        verifyToken, verifyGestureDataDownloadRequest, getGestureData)

function filePathFromFilename(fileName: string): string {
    return path.join(__dirname, '..', 'files', fileName);
}

async function appendArrayToFile(filePath: string, buffer: ArrayBuffer) {
    let fileHandle: FileHandle;

    try {
        const dataArray = Array.from(new Float32Array(buffer));
        console.log(`received dataArray of length: ${dataArray.length}`);
        fileHandle = await open(filePath, 'a');

        while (dataArray.length > 352) {
            const row = dataArray.splice(0, 352).join(",") + "\n";
            await fileHandle.appendFile(row);
        }

        await fileHandle.appendFile(dataArray.join(","));
    } catch (err) {
        throw err;
    } finally {
        fileHandle.close();
    }
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
        return "l0_pos_x,l0_pos_y,l0_pos_z,l0_quat_x,l0_quat_y,l0_quat_z,l0_quat_w,l1_pos_x,l1_pos_y,l1_pos_z,l1_quat_x,l1_quat_y,l1_quat_z,l1_quat_w,l2_pos_x,l2_pos_y,l2_pos_z,l2_quat_x,l2_quat_y,l2_quat_z,l2_quat_w,l3_pos_x,l3_pos_y,l3_pos_z,l3_quat_x,l3_quat_y,l3_quat_z,l3_quat_w,l4_pos_x,l4_pos_y,l4_pos_z,l4_quat_x,l4_quat_y,l4_quat_z,l4_quat_w,l5_pos_x,l5_pos_y,l5_pos_z,l5_quat_x,l5_quat_y,l5_quat_z,l5_quat_w,l6_pos_x,l6_pos_y,l6_pos_z,l6_quat_x,l6_quat_y,l6_quat_z,l6_quat_w,l7_pos_x,l7_pos_y,l7_pos_z,l7_quat_x,l7_quat_y,l7_quat_z,l7_quat_w,l8_pos_x,l8_pos_y,l8_pos_z,l8_quat_x,l8_quat_y,l8_quat_z,l8_quat_w,l9_pos_x,l9_pos_y,l9_pos_z,l9_quat_x,l9_quat_y,l9_quat_z,l9_quat_w,l10_pos_x,l10_pos_y,l10_pos_z,l10_quat_x,l10_quat_y,l10_quat_z,l10_quat_w,l11_pos_x,l11_pos_y,l11_pos_z,l11_quat_x,l11_quat_y,l11_quat_z,l11_quat_w,l12_pos_x,l12_pos_y,l12_pos_z,l12_quat_x,l12_quat_y,l12_quat_z,l12_quat_w,l13_pos_x,l13_pos_y,l13_pos_z,l13_quat_x,l13_quat_y,l13_quat_z,l13_quat_w,l14_pos_x,l14_pos_y,l14_pos_z,l14_quat_x,l14_quat_y,l14_quat_z,l14_quat_w,l15_pos_x,l15_pos_y,l15_pos_z,l15_quat_x,l15_quat_y,l15_quat_z,l15_quat_w,l16_pos_x,l16_pos_y,l16_pos_z,l16_quat_x,l16_quat_y,l16_quat_z,l16_quat_w,l17_pos_x,l17_pos_y,l17_pos_z,l17_quat_x,l17_quat_y,l17_quat_z,l17_quat_w,l18_pos_x,l18_pos_y,l18_pos_z,l18_quat_x,l18_quat_y,l18_quat_z,l18_quat_w,l19_pos_x,l19_pos_y,l19_pos_z,l19_quat_x,l19_quat_y,l19_quat_z,l19_quat_w,l20_pos_x,l20_pos_y,l20_pos_z,l20_quat_x,l20_quat_y,l20_quat_z,l20_quat_w,l21_pos_x,l21_pos_y,l21_pos_z,l21_quat_x,l21_quat_y,l21_quat_z,l21_quat_w,l22_pos_x,l22_pos_y,l22_pos_z,l22_quat_x,l22_quat_y,l22_quat_z,l22_quat_w,l23_pos_x,l23_pos_y,l23_pos_z,l23_quat_x,l23_quat_y,l23_quat_z,l23_quat_w,l24_pos_x,l24_pos_y,l24_pos_z,l24_quat_x,l24_quat_y,l24_quat_z,l24_quat_w,r0_pos_x,r0_pos_y,r0_pos_z,r0_quat_x,r0_quat_y,r0_quat_z,r0_quat_w,r1_pos_x,r1_pos_y,r1_pos_z,r1_quat_x,r1_quat_y,r1_quat_z,r1_quat_w,r2_pos_x,r2_pos_y,r2_pos_z,r2_quat_x,r2_quat_y,r2_quat_z,r2_quat_w,r3_pos_x,r3_pos_y,r3_pos_z,r3_quat_x,r3_quat_y,r3_quat_z,r3_quat_w,r4_pos_x,r4_pos_y,r4_pos_z,r4_quat_x,r4_quat_y,r4_quat_z,r4_quat_w,r5_pos_x,r5_pos_y,r5_pos_z,r5_quat_x,r5_quat_y,r5_quat_z,r5_quat_w,r6_pos_x,r6_pos_y,r6_pos_z,r6_quat_x,r6_quat_y,r6_quat_z,r6_quat_w,r7_pos_x,r7_pos_y,r7_pos_z,r7_quat_x,r7_quat_y,r7_quat_z,r7_quat_w,r8_pos_x,r8_pos_y,r8_pos_z,r8_quat_x,r8_quat_y,r8_quat_z,r8_quat_w,r9_pos_x,r9_pos_y,r9_pos_z,r9_quat_x,r9_quat_y,r9_quat_z,r9_quat_w,r10_pos_x,r10_pos_y,r10_pos_z,r10_quat_x,r10_quat_y,r10_quat_z,r10_quat_w,r11_pos_x,r11_pos_y,r11_pos_z,r11_quat_x,r11_quat_y,r11_quat_z,r11_quat_w,r12_pos_x,r12_pos_y,r12_pos_z,r12_quat_x,r12_quat_y,r12_quat_z,r12_quat_w,r13_pos_x,r13_pos_y,r13_pos_z,r13_quat_x,r13_quat_y,r13_quat_z,r13_quat_w,r14_pos_x,r14_pos_y,r14_pos_z,r14_quat_x,r14_quat_y,r14_quat_z,r14_quat_w,r15_pos_x,r15_pos_y,r15_pos_z,r15_quat_x,r15_quat_y,r15_quat_z,r15_quat_w,r16_pos_x,r16_pos_y,r16_pos_z,r16_quat_x,r16_quat_y,r16_quat_z,r16_quat_w,r17_pos_x,r17_pos_y,r17_pos_z,r17_quat_x,r17_quat_y,r17_quat_z,r17_quat_w,r18_pos_x,r18_pos_y,r18_pos_z,r18_quat_x,r18_quat_y,r18_quat_z,r18_quat_w,r19_pos_x,r19_pos_y,r19_pos_z,r19_quat_x,r19_quat_y,r19_quat_z,r19_quat_w,r20_pos_x,r20_pos_y,r20_pos_z,r20_quat_x,r20_quat_y,r20_quat_z,r20_quat_w,r21_pos_x,r21_pos_y,r21_pos_z,r21_quat_x,r21_quat_y,r21_quat_z,r21_quat_w,r22_pos_x,r22_pos_y,r22_pos_z,r22_quat_x,r22_quat_y,r22_quat_z,r22_quat_w,r23_pos_x,r23_pos_y,r23_pos_z,r23_quat_x,r23_quat_y,r23_quat_z,r23_quat_w,r24_pos_x,r24_pos_y,r24_pos_z,r24_quat_x,r24_quat_y,r24_quat_z,r24_quat_w,startTime,endTime\n"
    }
}

async function sendData(req: GestureDataRequest, res: Response) {
    console.log("received append-data request!");
    try {
        const filePath = filePathFromFilename(req.file_name);
        await appendArrayToFile(filePath, req.file.buffer.buffer)
        return res.status(201).send("Data received");
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown error. You might not have started the transfer.");
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


export { gestureDataRouter, appendArrayToFile };