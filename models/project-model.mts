type Project = {
    _id?: string;
    name: string;
    description: string;
    encryptedPass: string;
    token?: string; 
};

type Participant = {
    _id: string;
    projectId: string;
    pendingTrials: Trial[];
    completedTrialFiles: string[];
};

type Trial = {
    TrialID: string;
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

export { Project, Participant, Trial, Gesture };