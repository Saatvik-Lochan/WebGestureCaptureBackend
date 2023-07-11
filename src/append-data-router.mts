import { Router, Response, Request } from "express";
import { getGesture, getParticipant, getProject, getTrial } from "./database-util.mts";
import { Level } from "level";

const gestureDb = new Level<any, ArrayBuffer>('db/gestures.db', {
    keyEncoding: 'json', valueEncoding: 'buffer'
});

const gestureMetaDb = new Level<any, GestureMetadata>('db/gesturesMeta.db', {
    keyEncoding: 'json', valueEncoding: 'json'
});

type GestureMetadata = {
    receivedBatches: number[]
}

const appendDataRouter = Router();
appendDataRouter.post("/:projectName/:participantId/:trialId/:gestureId", appendData);

async function appendData(req: Request, res: Response) {
    try {
        const { projectName, participantId, trialId, gestureId } = req.params;
        const batchNumberStr = req.query.batchNumber;
        const batchNumber = parseInt(batchNumberStr as string);

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

        const gestureKey = {
            proj, participant, trial, gesture, batchNumber
        };

        const metaKey = {
            proj, participant, trial, gesture
        }

        await Promise.all(
            [gestureDb.put(gestureKey, req.body), 
             addReceivedBatch(metaKey, batchNumber)]);

        res.status(201).send("data added")
     
    } catch (err) {
        console.log(err);
        res.status(400)
    }

    async function addReceivedBatch(metaKey: any, batchNumber: number) {
        let currentValue: GestureMetadata;
        
        try {
            currentValue = await gestureMetaDb.get(metaKey);
        } catch (err) {
            currentValue = {
                receivedBatches: []
            };
        } finally {
            currentValue.receivedBatches.push(batchNumber);
            await gestureMetaDb.put(metaKey, currentValue);
        }
    }
}


export { appendDataRouter };