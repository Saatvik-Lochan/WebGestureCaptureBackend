import { error } from "console";
import Datastore from "nedb"

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

export { getProject, addProject };