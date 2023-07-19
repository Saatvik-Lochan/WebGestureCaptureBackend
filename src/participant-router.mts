import { Router, Response, Request } from "express";
import { verifyToken } from "./auth.mts";
import { UserAuthRequest } from "./models/user-auth-request.mts";
import { addParticipant, getParticipant, getProject, setParticipant } from "./database-util.mts";
import { Trial, isValidTrial } from "./models/project-model.mts";

// set up router
const participantRouter = Router();
participantRouter.post("/push-trial", verifyToken, addTrial);
participantRouter.get("/get-participants", verifyToken, getParticipants);

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
                { participant_id, pendingTrials: [trial], completedTrialFiles: []});
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

async function addParticipantFromReq(req: UserAuthRequest, res: Response) {
    try {
        const { project_name } = req.user;
        const { participant_id } = req.body;

        const proj = await getProject(project_name);
        const oldParticipant = getParticipant(proj, participant_id);

        console.log(participant_id);

        if (oldParticipant) {
            return res.status(400).send("Participant already exists in this project");
        } else {
            addParticipant(project_name, { participant_id, pendingTrials: [], completedTrialFiles: []});
            return res.status(201).send("Participant added");
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown error");
    }
}

async function addTrialToParticipant(req: UserAuthRequest, res: Response) {
    try {
        const { project_name } = req.user;
        const { id , trial } = req.body as { id: string, trial: Trial };

        if (!(id && trial)) {
            return res.status(400).send("Participant ID and Trial required");
        } 

        if (!isValidTrial(trial)) {
            return res.status(400).send("Trial is invalid");
        }


        const proj = await getProject(project_name);
        const participant = getParticipant(proj, id);
        
        if (!participant) {
            return res.status(400).send("Participant does not exist");
        } else {
            if (participant.pendingTrials.map(trial => trial.trial_id).includes(trial.trial_id)) {
                return res.status(400).send("Trial of this id already exists");
            }

            participant.pendingTrials.push(trial);
            setParticipant(project_name, participant);
            return res.status(201).send("Trial added successfully");
        }

    } catch (err) {
        res.status(500).send("Unknown error");
        console.log(err.message);
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