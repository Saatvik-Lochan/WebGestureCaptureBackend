import { Router, Response, Request } from "express";
import { __rootdir } from "../database-util.js";
import { getParticipantFromUrlCode, getProject, getTrial, moveTrialToComplete, setParticipant } from "../database-util.js";
import { join } from "path";
import { writeFileSync } from "fs";

// set up router
const trialRouter = Router();
trialRouter.get("/next-trial/:project_name/:participant_id", getNextTrial);
trialRouter.post("/complete-trial/:project_name/:participant_id/:trial_id", completeTrial);

async function getNextTrial(req: Request, res: Response) {
    try {
        const { project_name, participant_id } = req.params;
        
        const proj = await getProject(project_name);

        if (!proj) {
            return res.status(400).send("Unknown project");
        }

        const participant = getParticipantFromUrlCode(proj, participant_id);

        if (!participant) {
            return res.status(400).send("Unknown participant");
        }

        if (participant.pendingTrials.length == 0)
            res.status(404).send("No pending trials");
        else
            res.status(200).json(participant.pendingTrials[0]);
        
    } catch (err) {
        res.status(500).send("Unknown error");
        console.log(err);
    }  
}

async function completeTrial(req: Request, res: Response) {
    try {
        // trial validation
        const { project_name, participant_id, trial_id } = req.params;
        
        const proj = await getProject(project_name);

        if (!proj) {
            return res.status(400).send("Unknown project");
        }

        const participant = getParticipantFromUrlCode(proj, participant_id);

        if (!participant) {
            return res.status(400).send("Unknown participant");
        }

        const trial = getTrial(participant, trial_id);

        if (!trial) {
            return res.status(400).send("Unknown trial");
        }

        // trial is known to be valid after this
        const newParticipant = moveTrialToComplete(participant, trial_id);
        await setParticipant(project_name, newParticipant);

        if (req.body) {
           const path = join(__rootdir, "log_files", "trials.log");
           console.log(req.body);
           writeFileSync(path, req.body, { flag: 'a' });
        }

        res.status(200).send("Trial completed");
        console.log("Completed a trial");
    } catch (err) {
        res.status(500).send("Unknown error");
        console.log(err);
    }  
}

export { trialRouter };