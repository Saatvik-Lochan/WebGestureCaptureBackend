import { Router, Response } from "express";
import { verifyToken } from "./auth.mts";
import { UserAuthRequest } from "./models/user-auth-request.mts";
import { addParticipant, getParticipant, getProject, setParticipant } from "./database-util.mts";
import { Trial, isValidTrial } from "./models/project-model.mts";

// set up router
const participantRouter = Router();
participantRouter.post("/add-participant", verifyToken, addParticipantFromReq);
participantRouter.post("/add-trial", verifyToken, addTrialToParticipant);
participantRouter.get("/get-participants", verifyToken, getParticipants);


async function addParticipantFromReq(req: UserAuthRequest, res: Response) {
    try {
        const { name } = req.user;
        const { id } = req.body;

        const proj = await getProject(name);
        const oldParticipant = getParticipant(proj, id);

        console.log(id);

        if (oldParticipant) {
            return res.status(400).send("Participant already exists in this project");
        } else {
            addParticipant(name, { id, pendingTrials: [], completedTrialFiles: []});
            return res.status(201).send("Participant added");
        }

    } catch (err) {
        console.log(err.message);
        return res.status(400).send("Unknown error");
    }
}

async function addTrialToParticipant(req: UserAuthRequest, res: Response) {
    try {
        const { name } = req.user;
        const { id , trial } = req.body as { id: string, trial: Trial };

        if (!(id && trial)) {
            return res.status(400).send("Participant ID and Trial required");
        } 

        if (!isValidTrial(trial)) {
            return res.status(400).send("Trial is invalid");
        }


        const proj = await getProject(name);
        const participant = getParticipant(proj, id);
        
        if (!participant) {
            return res.status(400).send("Participant does not exist");
        } else {
            if (participant.pendingTrials.map(trial => trial.TrialID).includes(trial.TrialID)) {
                return res.status(400).send("Trial of this id already exists");
            }

            participant.pendingTrials.push(trial);
            setParticipant(name, participant);
            return res.status(201).send("Trial added successfully");
        }

    } catch (err) {
        console.log(err.message);
    }
}

async function getParticipants(req: UserAuthRequest, res: Response) {
    try {
        const { name } = req.user;
      
        const proj = await getProject(name);
        return res.status(200).send(proj.participants);
        
    } catch (err) {
        console.log(err.message);
    }
}

export { participantRouter };