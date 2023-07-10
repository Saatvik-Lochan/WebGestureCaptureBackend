import Datastore from "nedb"
import { Participant, Project } from "./models/project-model.mts";

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
 
function getProject(name: string): Promise<Project> {
    return new Promise(resolve => {
        projectDb.findOne({ name }, (err: Error, doc: any) => {
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
    projectDb.update({ name: project_name }, 
        { $set: {token: token} }, {}
    );
}

// participant based functions
function addParticipant(projectName: string, newParticipant: Participant) {
    projectDb.update({ name: projectName }, { $push: { participants: newParticipant } });
}

function getParticipant(project: Project, participantId: string): Participant {
    project.participants.forEach((participant: Participant) => {
        if (participant.id === participantId) return participant;
    });

    return null;
}

function setAllParticipants(projectName: string, allParticipants: Participant[]) {
    projectDb.update({ name: projectName }, { $set: { participants: allParticipants } });
}

// pretty inefficent, preferentially use setAllParticipants and change in bulk
async function setParticipant(projectName: string, newParticipant: Participant) {
    const proj = await getProject(projectName);
    proj.participants = proj.participants.map((participant: Participant) => {
        if (participant.id == newParticipant.id) return newParticipant;
        else return participant;
    });
    setAllParticipants(projectName, proj.participants);
}



export { getProject, addProject, addTokenTo, getParticipant, addParticipant, setParticipant };