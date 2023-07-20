import { Request } from "express";
import { Gesture, Participant, Project, Trial } from "./project-model.mts";

interface GestureDataRequest extends Request {
    project: Project;
    participant: Participant;
    trial: Trial;
    gesture: Gesture;
    file_name: string;
}

export { GestureDataRequest }