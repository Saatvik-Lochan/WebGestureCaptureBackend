import { Router, Response, Request } from "express";
import { getParticipant, getProject } from "./database-util.mts";

// set up router
const trialRouter = Router();
trialRouter.get("/:projectName/:participantId", getIncompleteTrials)

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

export { trialRouter };