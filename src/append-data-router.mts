import { Router, Response, Request } from "express";
import { getParticipant, getProject, getTrial } from "./database-util.mts";
import { Level } from "level";

const gestureDb = new Level<any, ArrayBuffer>('db/gestures.db', {
    keyEncoding: 'json', valueEncoding: 'buffer'
});

const gestureMetaDb = new Level<any, GestureMetadata>('db/gesturesMeta.db', {
    keyEncoding: 'json', valueEncoding: 'json'
});

type GestureMetadata = {
    receivedBatches: number[],
    closed: Boolean
}

// const appendDataRouter = Router();
// appendDataRouter.post("/close/:projectName/:participantId/:trialId/:gestureId", closeData);
// appendDataRouter.post("/append/:projectName/:participantId/:trialId/:gestureId", appendData);

// async function closeData(req: Request, res: Response) {
//     try {
//         const { projectName, participantId, trialId, gestureId } = req.params;
//         const proj = await getProject(projectName);
    
//         if (!proj) {
//             return res.status(400).send("Unknown project");
//         }
    
//         const participant = getParticipant(proj, participantId);
    
//         if (!participant) {
//             return res.status(400).send("Unknown participant");
//         }
    
//         const trial = getTrial(participant, trialId);
    
//         if (!trial) {
//             return res.status(400).send("Unknown trial");
//         }
    
//         const gesture = getGesture(trial, gestureId);
    
//         if (!gesture) {
//             return res.status(400).send("Unknown gesture");
//         }

//         const metaKey = getMetaKey(
//             projectName, 
//             participantId,
//             trialId,
//             gestureId
//         )
        
//         await closeGesture(metaKey);
         
//     } catch(err) {
//         console.log(err);
//         return res.status(400);
//     }

//     async function closeGesture(metaKey: any) {
//         const metadata = await gestureMetaDb.get(metaKey);
//         metadata.closed = true;
//         await gestureMetaDb.put(metaKey, metadata);
//     }
// }

// async function appendData(req: Request, res: Response) {
//     try {
//         const { projectName, participantId, trialId, gestureId } = req.params;
//         const batchNumberStr = req.query.batchNumber;
//         const batchNumber = parseInt(batchNumberStr as string);

//         const proj = await getProject(projectName);
    
//         if (!proj) {
//             return res.status(400).send("Unknown project");
//         }
    
//         const participant = getParticipant(proj, participantId);
    
//         if (!participant) {
//             return res.status(400).send("Unknown participant");
//         }
    
//         const trial = getTrial(participant, trialId);
    
//         if (!trial) {
//             return res.status(400).send("Unknown trial");
//         }
    
//         const gesture = getGesture(trial, gestureId);
    
//         if (!gesture) {
//             return res.status(400).send("Unknown gesture");
//         }
    
//         if (!batchNumber) {
//             return res.status(400).send("Must include a batchNumber");
//         }

//         const gestureKey = getGestureKey(
//             projectName,
//             participantId,
//             trialId,
//             gestureId,
//             batchNumber
//         )

//         const metaKey = getMetaKey(
//             projectName, 
//             participantId,
//             trialId,
//             gestureId
//         )

//         const metaData = await gestureMetaDb.get(metaKey);

//         if (metaData.closed) {
//             return res.status(400).send("This gesture is closed to appends");
//         }

//         await Promise.all(
//             [gestureDb.put(gestureKey, req.body), 
//              addReceivedBatch(metaKey, batchNumber)]);

//         res.status(201).send("data added")
     
//     } catch (err) {
//         console.log(err);
//         res.status(400)
//     }

//     async function addReceivedBatch(metaKey: any, batchNumber: number) {
//         let currentValue: GestureMetadata;
        
//         try {
//             currentValue = await gestureMetaDb.get(metaKey);
//         } catch (err) {
//             currentValue = {
//                 receivedBatches: [],
//                 closed: false
//             };
//         } finally {
//             currentValue.receivedBatches.push(batchNumber);
//             await gestureMetaDb.put(metaKey, currentValue);
//         }
//     }
// }

// function getGestureKey(
//     projectName: string, 
//     participantId: string, 
//     trialId: string, 
//     gestureId: string,
//     batchNumber: number) {

//         const metaKey = getMetaKey(projectName, participantId, trialId, gestureId);
//         metaKey['batchNumber'] = batchNumber;
//         return metaKey;
// }

// function getMetaKey(
//     projectName: string, 
//     participantId: string, 
//     trialId: string, 
//     gestureId: string) {

//         return {projectName, participantId, trialId, gestureId};
// }

// export { appendDataRouter };