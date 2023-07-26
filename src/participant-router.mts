import { Router, Response, Request } from "express";
import { verifyToken } from "./auth.mts";
import { UserAuthRequest } from "./models/user-auth-request.mts";
import { addParticipant, getAllCompletedTrialsFromProject, getParticipant, getProject, removeTrialFromParticipant, setParticipant } from "./database-util.mts";
import { Trial, isValidTrial } from "./models/project-model.mts";
import { randomBytes } from "crypto";

// set up router
const participantRouter = Router();
participantRouter.post("/push-trial", verifyToken, addTrial);
participantRouter.get("/:pid/get-url", verifyToken, getParticipantUrl)
participantRouter.get("/get-participants", verifyToken, getParticipants);
participantRouter.get("/get-completed-trials", verifyToken, getCompletedTrials);
participantRouter.post("/remove-trial", verifyToken, removeTrial);

// participantRouter.post("/add-trial", verifyToken, addTrialToParticipant);
// participantRouter.post("/add-participant", verifyToken, addParticipantFromReq);

async function addTrial(req: UserAuthRequest, res: Response) {
    try {
        const { project_name } = req.user;
        const { participant_id, trial } = req.body as { participant_id: string, trial: Trial };

        if (!(participant_id && trial)) {
            return res.status(400).send("Participant ID and Trial required");
        } 

        if (!isValidTrial(trial)) {
            return res.status(400).send("Invalid trial");
        }

        const project = await getProject(project_name);
        const participant = getParticipant(project, participant_id);

        if (!participant) {
            addParticipant(project_name, 
                { participant_id, pendingTrials: [trial], completedTrials: []});
        } else {
            if (participant.pendingTrials.map(trial => trial.trial_id).includes(trial.trial_id)) {
                return res.status(400).send("Trial of this ID alreay exists")
            }

            participant.pendingTrials.push(trial);
            setParticipant(project_name, participant);
        }

        return res.status(201).send("Trial added successfully");
    } catch (err) {
        res.status(500).send("Unknown error")
        console.log(err.message);
    }
} 

async function removeTrial(req: UserAuthRequest, res: Response) {
    try {
        const { project_name } = req.user;
        const { participant_id, trial_id } = req.body;

        if (!(participant_id && trial_id)) {
            return res.status(400).send("Participant and Trial ID required");
        } 

        const project = await getProject(project_name);
        if (!project) return res.status(400).send("Invalid project");
            
        let participant = getParticipant(project, participant_id);
        if (!participant) return res.status(400).send("Invalid participant");

        participant = removeTrialFromParticipant(participant, trial_id);
        setParticipant(project_name, participant);
        console.log(`Trial ${trial_id} was removed`);
        return res.status(200).send("Trial removed");
    } catch (err) {
        return res.status(500).send("Unknown error");
    }
}

async function getParticipantUrl(req: UserAuthRequest, res: Response) {
    function generateUrlCode() {
        return randomBytes(5).toString('hex')
    }
    try{
        const { project_name } = req.user;
        const { pid } = req.params;

        if (!pid) return res.status(400).send("Participant ID required");

        const project = await getProject(project_name);
        if (!project) return res.status(400).send("Invalid project");
        
        const participant = getParticipant(project, pid);
        if (!participant) return res.status(400).send("Invalid participant");

        if (!('urlCode' in participant)) {
            participant.urlCode = generateUrlCode();
            setParticipant(project_name, participant);
        }  

        res.status(200).send(participant.urlCode);
    } catch (err) {
        res.status(500).send("Unknown error");
    }
}

async function getCompletedTrials(req: UserAuthRequest, res: Response) {
    try {
        const { project_name } = req.user;

        const project = await getProject(project_name);
        if (!project) return res.status(400).send("Invalid project");

        const completedTrials = getAllCompletedTrialsFromProject(project);
        res.status(200).send(completedTrials);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Unknown server error");
    }

}

async function getParticipants(req: UserAuthRequest, res: Response) {
    try {
        const { project_name } = req.user;
      
        const proj = await getProject(project_name);
        return res.status(200).send(proj.participants);
        
    } catch (err) {
        res.status(500).send("Unknown error");
        console.log(err.message);
    }
}

export { participantRouter };