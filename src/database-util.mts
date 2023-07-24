import Datastore from "nedb"
import { Participant, Project, Trial } from "./models/project-model.mts";

// set up database
const projectDb = new Datastore({
    filename: "db/user.db",
    autoload: true
});

// project based functions
function getNumberOfProjects(): Promise<number> {
    return new Promise(resolve => {
        projectDb.count({}, (err: Error, count: number) => resolve(count));
    });
}
 
function getProject(project_name: string): Promise<Project> {
    return new Promise(resolve => {
        projectDb.findOne({ project_name }, (err: Error, doc: any) => {
            if (err) throw err;
            
            resolve(doc);
        });
    })
}

function addProject(project: Project): Promise<Project> {
    return new Promise(resolve => {
        projectDb.insert(project, (err, doc: Project) => {
            if (err) throw err;
            else resolve(doc);
        });
    });
}

function addTokenTo(project_name: string, token: string) {
    projectDb.update({ project_name: project_name }, 
        { $set: {token: token} }, {}
    );
}

// participant based functions
function addParticipant(projectName: string, newParticipant: Participant) {
    projectDb.update({ project_name: projectName }, { $push: { participants: newParticipant } });
}

function getParticipant(project: Project, participantId: string): Participant {
    let outParticipant = null;

    project.participants.forEach((participant: Participant) => {
        if (participant.participant_id === participantId) outParticipant = participant;
    });

    return outParticipant;
}

function getPidAndUrlCode(pidAndUrlCode: string) {
    const regex = /(?<pid>.*)-(?<urlCode>.*)/;
    return pidAndUrlCode.match(regex);
}

function getParticipantFromUrlCode(project: Project, pidAndUrlCode: string) {
    const match = getPidAndUrlCode(pidAndUrlCode);

    if (match == null) return null;

    const {pid, urlCode} = match.groups;
    const participant = getParticipant(project, pid);

    if (participant == null || 
        !('urlCode' in participant) || 
        participant.urlCode != urlCode) return null;

    return participant;
}

function setAllParticipants(projectName: string, allParticipants: Participant[]) {
    projectDb.update({ project_name: projectName }, { $set: { participants: allParticipants } });
}

// pretty inefficent, preferentially use setAllParticipants and change in bulk
async function setParticipant(projectName: string, newParticipant: Participant) {
    const proj = await getProject(projectName);
    proj.participants = proj.participants.map((participant: Participant) => {
        if (participant.participant_id == newParticipant.participant_id) return newParticipant;
        else return participant;
    });
    setAllParticipants(projectName, proj.participants);
}

function getCompletedTrial(participant: Participant, trialId: string): Trial {
    let outTrial = null;

    participant.completedTrials.forEach((trial: Trial) => {
        if (trial.trial_id === trialId) outTrial = trial;
    });

    return outTrial;
}

// trial based functions
function getTrial(participant: Participant, trialId: string): Trial {
    let outTrial = null;

    participant.pendingTrials.forEach((trial: Trial) => {
        if (trial.trial_id === trialId) outTrial = trial;
    });

    return outTrial;
}

// removes trial from input participant as well
function moveTrialToComplete(participant: Participant, trialId: string) {
    const newPending: Trial[] = [];

    for (let trial of participant.pendingTrials) {
        if (trial.trial_id == trialId) {
            participant.completedTrials.push(trial);
        } else {
            newPending.push(trial);
        }
    }

    participant.pendingTrials = newPending;
    return participant;
}

// aggregating functions
function getAllCompletedTrialsFromProject(project: Project) {
    let outList: string[] = [];

    project.participants.forEach(participant => {
        outList = [...outList, ...participant.completedTrials.map(trial => trial.trial_id)];
    });

    return outList;
}

export { getProject, addProject, addTokenTo, getParticipant, addParticipant, setParticipant, getTrial, moveTrialToComplete, getParticipantFromUrlCode, getCompletedTrial, getPidAndUrlCode, getAllCompletedTrialsFromProject };