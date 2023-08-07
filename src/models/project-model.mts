import Joi from "joi";

type Project = {
    project_name: string;
    description: string;
    encryptedPass: string;

    participants: Participant[];
    token?: string; 
};

type Participant = {
    participant_id: string;
    pendingTrials: Trial[];
    completedTrials: Trial[];
    urlCode?: string;
};

type Trial = {
    trial_id: string;
    trial_name: string;
    options: {
        instructionDuration: number
    };
    instructions: string;
    gestures: Gesture[];
};

type Gesture = {
    options: {
        instructionDuration: number,
    };
    gesture_id: string; // gid, or the id of the gesture class
    gesture_name: string;
    instruction: string;
    duration: number;
    completed?: boolean;
};

function isValidTrial(trial: Trial) {
    const gestureSchema = Joi.object({
        options: Joi.object({
            instructionDuration: Joi.number()
        }),
        gesture_name: Joi.string().required(),
        gesture_id: Joi.string().required(),
        instruction: Joi.string().required(),
        duration: Joi.number().required()
    });

    const trialSchema = Joi.object({
        trial_name: Joi.string().required(),
        trial_id: Joi.string().required(),
        options: Joi.object({
            instructionDuration: Joi.number(),
        }),
        instructions: Joi.string().required(),
        gestures: Joi.array().items(gestureSchema).required()
    }).required();

    try {
        Joi.assert(trial, trialSchema);
        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    }
}

export { Project, Participant, Trial, Gesture, isValidTrial };