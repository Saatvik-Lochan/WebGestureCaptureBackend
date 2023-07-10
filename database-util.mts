import Datastore from "nedb"
import { Project } from "./models/project-model.mts";

// set up database
const projectDb = new Datastore({
    filename: "db/user.db",
    autoload: true
});

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

export { getProject, addProject, addTokenTo };