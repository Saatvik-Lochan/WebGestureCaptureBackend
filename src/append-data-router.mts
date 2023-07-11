import { Router, Response, Request } from "express";
import { getGesture, getParticipant, getProject, getTrial } from "./database-util.mts";
import { Level } from "level";

const gestureDb = new Level<any, ArrayBuffer>('db/gestures.db', {
    keyEncoding: 'json', valueEncoding: 'buffer'
});

const appendDataRouter = Router();
appendDataRouter.post("/:projectName/:participantId/:trialId/:gestureId", appendData);

async function appendData(req: Request, res: Response) {
    const { projectName, participantId, trialId, gestureId } = req.params;
    const batchNumber = req.query.batchNumber;
        
    const proj = await getProject(projectName);

    if (!proj) {
        return res.status(400).send("Unknown project");
    }

    const participant = getParticipant(proj, participantId);

    if (!participant) {
        return res.status(400).send("Unknown participant");
    }

    const trial = getTrial(participant, trialId);

    if (!trial) {
        return res.status(400).send("Unknown trial");
    }

    const gesture = getGesture(trial, gestureId);

    if (!gesture) {
        return res.status(400).send("Unknown gesture");
    }

    if (!batchNumber) {
        return res.status(400).send("Must include a batchNumber");
    }

    const key = {
        proj, participant, trial, gesture, batchNumber
    };

    await gestureDb.put(key, req.body as ArrayBuffer);
    res.status(201).send("Data added");
}