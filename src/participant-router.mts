import { Router, Response, Request } from "express";
import { verifyToken } from "./auth.mts";
import { UserAuthRequest } from "./models/user-auth-request.mts";
import { addParticipant, getParticipant, getProject, setParticipant } from "./database-util.mts";
import { isValidTrial } from "./models/project-model.mts";

// set up router
const participantRouter = Router();
participantRouter.post("/add-participant", verifyToken, addParticipantFromReq);


async function addParticipantFromReq(req: UserAuthRequest, res: Response) {
    try {
        const { name } = req.user;
        const { id } = req.body;

        const proj = await getProject(name);
        const oldParticipant = getParticipant(proj, id);

        if (oldParticipant) {
            res.status(400).send("Participant already exists in this project");
        } else {
            addParticipant(name, { id, pendingTrials: [], completedTrialFiles: []});
            res.status(201).send("Participant added");
        }

    } catch (err) {
        console.log(err.message);
    }
}

async function addTrialToParticipant(req: UserAuthRequest, res: Response) {
    try {
        const { name } = req.user;
        const { id , trial } = req.body;

        if (!(id && trial)) {
            res.status(400).send("Participant ID and Trial required");
        } 

        if (!isValidTrial(trial)) {
            res.status(400).send("Trial is invalid");
        }

        const proj = await getProject(name);
        const participant = getParticipant(proj, id);
        
        if (!participant) {
            res.status(400).send("Participant does not exist");
        } else {
            participant.pendingTrials.push(trial);
            setParticipant(name, participant);
            res.status(200).send("Trial added");
        }
    } catch (err) {
        console.log(err.message);
    }
}
