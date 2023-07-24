import { Router, Response, Request } from "express";
import { getParticipantFromUrlCode, getProject, getTrial, moveTrialToComplete, setParticipant } from "./database-util.mts";

// set up router
const trialRouter = Router();
trialRouter.get("/next-trial/:projectName/:participantId", getNextTrial);
trialRouter.post("/complete-trial/:projectName/:participantId/:trialId", completeTrial);

async function getNextTrial(req: Request, res: Response) {
    try {
        const { projectName, participantId } = req.params;
        
        const proj = await getProject(projectName);

        if (!proj) {
            return res.status(400).send("Unknown project");
        }

        const participant = getParticipantFromUrlCode(proj, participantId);

        if (!participant) {
            return res.status(400).send("Unknown participant");
        }

        if (participant.pendingTrials.length == 0)
            res.status(200).send(null);
        else
            res.status(200).send(participant.pendingTrials[0]);
        
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

        const participant = getParticipantFromUrlCode(proj, participantId);

        if (!participant) {
            return res.status(400).send("Unknown participant");
        }

        const trial = getTrial(participant, trialId);

        if (!trial) {
            return res.status(400).send("Unknown trial");
        }

        // trial is known to be valid after this
        const newParticipant = moveTrialToComplete(participant, trialId);
        setParticipant(projectName, newParticipant);

        res.status(200).send("Trial completed");

    } catch (err) {
        res.status(500).send("Unknown error");
        console.log(err);
    }  
}

export { trialRouter };