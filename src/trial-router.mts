import { Router, Response, Request } from "express";
import { getParticipant, getProject, getTrial, removeTrial } from "./database-util.mts";

// set up router
const trialRouter = Router();
trialRouter.get("/:projectName/:participantId", getIncompleteTrials);
trialRouter.post("/:projectName/:participantId/:trialId", completeTrial);

async function getIncompleteTrials(req: Request, res: Response) {
    try {
        const { projectName, participantId } = req.params;
        
        const proj = await getProject(projectName);

        if (!proj) {
            return res.status(400).send("Unknown project");
        }

        const participant = getParticipant(proj, participantId);

        if (!participant) {
            return res.status(400).send("Unknown participant");
        }

        res.status(200).send(participant.pendingTrials);
    } catch (err) {
        res.status(500).send("Unknown error");
        console.log(err);
    }  
}

async function completeTrial(req: Request, res: Response) {
    try {
        // trial validation
        const { projectName, participantId, trialId } = req.params;
        
        const proj = await getProject(projectName);

        if (!proj) {
            return res.status(400).send("Unknown project");
        }

        const participant = getParticipant(proj, participantId);

        if (!participant) {
            return res.status(400).send("Unknown participant");
        }

        const trial = getTrial(participant, trialId);
        console.log(trial);

        if (!trial) {
            return res.status(400).send("Unknown trial");
        }

        // trial is known to be valid after this
        removeTrial(participant, trialId);

        // TODO: save request data
        

        res.send(201).send("Data appended");

    } catch (err) {
        res.status(500).send("Unknown error");
        console.log(err);
    }  
}

export { trialRouter };