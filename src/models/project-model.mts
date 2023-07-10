import Joi, { required } from "joi";

type Project = {
    _id?: string;
    name: string;
    description: string;
    encryptedPass: string;

    participants: Participant[];
    token?: string; 
};

type Participant = {
    id: string;
    pendingTrials: Trial[];
    completedTrialFiles: string[];
};

type Trial = {
    TrialID: string;
    name: string;
    options: {
        instructionDuration: number
    };
    instructions: string;
    gestures: Gesture[];
};

type Gesture = {
    options: {
        instructionDuration: number,
        performDuration: number
    };
    name: string;
    instruction: string;
};

function isValidTrial(trial: Trial) {
    const gestureSchema = Joi.object({
        options: Joi.object({
            instructionDuration: Joi.number(),
            performDuration: Joi.number()
        }),
        name: Joi.string().required(),
        instruction: Joi.string().required()
    }).required();

    const trialSchema = Joi.object({
        name: Joi.string().alphanum().required(),
        TrialID: Joi.string().required(),
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
        return false;
    }
}

export { Project, Participant, Trial, Gesture, isValidTrial };