import Datastore from "nedb"
import { Participant, Project, Trial } from "./models/project-model.mts";
import { GestureClassLocator } from "./demonstration-router.mts";

const codeExpirationMs = 60000000; // 1000 minutes (for debug)

// set up database
const projectDb = new Datastore({
    filename: "db/user.db",
    autoload: true
});

const demonstrationDb = new Datastore({
    filename: "db/demonstration.db",
    autoload: true
});

// demonstration based functions
export interface GestureClassStamped extends GestureClassLocator {
    stamped: number;
    _id?: string;
}

export function addLocator(locator: GestureClassLocator) {
    const stamped: GestureClassStamped = { ...locator, stamped: Date.now()};

    return new Promise((resolve, reject)  => {
        demonstrationDb.insert(stamped, (err: Error, doc: GestureClassStamped) => {
            if (err) return reject(err);

            resolve(doc._id);
        });
    })
}

export function getLocatorFromShortCode(shortCode: string): Promise<GestureClassLocator>{
    return new Promise((resolve, reject) => {
        demonstrationDb.findOne({ _id: shortCode }, (err: Error, doc: GestureClassStamped) => {
            if (err) return reject(err);
            
            if (!doc) {
                return reject(Error("No such shortcode"));
            } 

            if (Date.now() - doc.stamped > codeExpirationMs) {
                return reject(Error("Code expired"));
            }

            resolve(doc);
        });
    });
}

// project based functions
export function getNumberOfProjects(): Promise<number> {
    return new Promise(resolve => {
        projectDb.count({}, (err: Error, count: number) => resolve(count));
    });
}
 
export function getProject(project_name: string): Promise<Project> {
    return new Promise(resolve => {
        projectDb.findOne({ project_name }, (err: Error, doc: any) => {
            if (err) throw err;
            
            resolve(doc);
        });
    })
}

export function addProject(project: Project): Promise<Project> {
    return new Promise(resolve => {
        projectDb.insert(project, (err, doc: Project) => {
            if (err) throw err;
            else resolve(doc);
        });
    });
}

export function addTokenTo(project_name: string, token: string) {
    projectDb.update({ project_name: project_name }, 
        { $set: {token: token} }, {}
    );
}

// participant based functions
export function addParticipant(projectName: string, newParticipant: Participant) {
    projectDb.update({ project_name: projectName }, { $push: { participants: newParticipant } });
}

export function getParticipant(project: Project, participantId: string): Participant {
    let outParticipant = null;

    project.participants.forEach((participant: Participant) => {
        if (participant.participant_id === participantId) outParticipant = participant;
    });

    return outParticipant;
}

export function getPidAndUrlCode(pidAndUrlCode: string) {
    const regex = /(?<pid>.*)-(?<urlCode>.*)/;
    return pidAndUrlCode.match(regex);
}

export function getParticipantFromUrlCode(project: Project, pidAndUrlCode: string) {
    const match = getPidAndUrlCode(pidAndUrlCode);

    if (match == null) return null;

    const {pid, urlCode} = match.groups;
    const participant = getParticipant(project, pid);

    if (participant == null || 
        !('urlCode' in participant) || 
        participant.urlCode != urlCode) return null;

    return participant;
}

export function setAllParticipants(projectName: string, allParticipants: Participant[]) {
    projectDb.update({ project_name: projectName }, { $set: { participants: allParticipants } });
}

// pretty inefficent, preferentially use setAllParticipants and change in bulk
export async function setParticipant(projectName: string, newParticipant: Participant) {
    const proj = await getProject(projectName);
    proj.participants = proj.participants.map((participant: Participant) => {
        if (participant.participant_id == newParticipant.participant_id) return newParticipant;
        else return participant;
    });
    setAllParticipants(projectName, proj.participants);
}

export function getCompletedTrial(participant: Participant, trialId: string): Trial {
    let outTrial = null;

    participant.completedTrials.forEach((trial: Trial) => {
        if (trial.trial_id == trialId) outTrial = trial;
    });

    return outTrial;
}

// trial based functions
export function getTrial(participant: Participant, trialId: string): Trial {
    let outTrial = null;

    participant.pendingTrials.forEach((trial: Trial) => {
        if (trial.trial_id == trialId) outTrial = trial;
    });

    return outTrial;
}

// removes trial from input participant as well
export function moveTrialToComplete(participant: Participant, trialId: string) {
    const newPending: Trial[] = [];
    console.log(participant)

    for (let trial of participant.pendingTrials) {
        if (trial.trial_id == trialId) {
            participant.completedTrials.push(trial);
        } else {
            newPending.push(trial);
        }
    }

    participant.pendingTrials = newPending;
    console.log(participant)
    return participant;
}

export function removeTrialFromParticipant(participant: Participant, trialId: string) {
    participant.completedTrials = removeTrialFromList(participant.completedTrials);
    participant.pendingTrials = removeTrialFromList(participant.pendingTrials);
    return participant;

    function removeTrialFromList(trialList: Trial[]) {
        return trialList.filter(trial => trial.trial_id != trialId);
    }
}

// aggregating functions
export function getAllCompletedTrialsFromProject(project: Project) {
    let outList: Trial[] = [];

    project.participants.forEach(participant => {
        outList = [...outList, ...participant.completedTrials];
    });

    return outList.map(trial => trial.trial_id);
}
