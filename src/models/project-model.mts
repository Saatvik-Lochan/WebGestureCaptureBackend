import Joi from "joi";

/**
 * Enapsulates all the information required for one project. 
 */
type Project = {
    project_name: string;
    description: string;
    encryptedPass: string;

    participants: Participant[];

    /**
     * The JWToken used to validate this project. It is populated before
     * insertion into the database.
     */
    token?: string; 
};

/**
 * Encapsulates all the information of a participant. Each {@link Participant}
 * belongs to a single {@link Project} in the database. 
 */
type Participant = {
    participant_id: string;
    pendingTrials: Trial[];
    completedTrials: Trial[];
    urlCode?: string;
};

/**
 * Encapsulates all the information of a trial. Each {@link Trial}
 * belongs to a single {@link Participant}. 
 */
type Trial = {
    trial_id: string;
    trial_name: string;
    instructions: string;
    gestures: Gesture[];
};

/**
 * Encapsulates all the information of a trial. Each {@link Gesture}
 * belongs to a single {@link Trial}. 
 */
type Gesture = {
    /**
     * The id of the gesture class. 
     * 
     * @remarks It is not a unique id. There can be multiple gestures
     * of the same gesture class
     */
    gesture_id: string; // gid, or the id of the gesture class

    /**
     * The name of the gesture class.
     * 
     * @remarks Similar to {@link gesture_id} this is not unique to each gesture.
     * All gestures of this class will have the same name. However, 
     * gesture_name does not have to be unique amongst gesture classes either.
     */
    gesture_name: string;

    /**
     * The instructions that will be displayed before this gesture is to 
     * be performed
     */
    instruction: string;

    /**
     * The duration (in seconds) ths gesture is supposed to be captured for
     */
    duration: number;
};

function isValidTrial(trial: Trial) {
    const gestureSchema = Joi.object({
        gesture_name: Joi.string().required(),
        gesture_id: Joi.string().required(),
        instruction: Joi.string().required(),
        duration: Joi.number().required()
    });

    const trialSchema = Joi.object({
        trial_name: Joi.string().required(),
        trial_id: Joi.string().required(),
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