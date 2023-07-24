import { Request } from "express";
import { Gesture, Participant, Project, Trial } from "./project-model.mts";
import { UserAuthRequest } from "./user-auth-request.mts";

interface GestureDataDownloadRequest extends UserAuthRequest {
    file_name: string;
}

interface GestureDataRequest extends Request {
    project: Project;
    participant: Participant;
    trial: Trial;
    gesture: Gesture;
    file_name: string;
}

export { GestureDataRequest, GestureDataDownloadRequest }