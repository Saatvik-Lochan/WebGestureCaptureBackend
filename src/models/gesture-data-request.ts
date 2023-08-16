import { Request } from "express";
import { Gesture, Participant, Project, Trial } from "./project-model.js";
import { UserAuthRequest } from "./user-auth-request.js";

interface GestureDataDownloadRequest extends UserAuthRequest {
    file_name: string;
}

interface GestureDataRequest extends Request {
    project: Project;
    participant: Participant;
    trial: Trial;
    gesture: Gesture;

    /**
     * A variable populated by the middleware, pointing to the location
     * of the gesture data in the server's system storage
     */
    file_name: string;
}

export { GestureDataRequest, GestureDataDownloadRequest }