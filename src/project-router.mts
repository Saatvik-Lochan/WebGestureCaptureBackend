import { Router, Response, Request } from "express";
import { addProject, getProject, addTokenTo } from "./database-util.mts";
import { hash, compare } from "bcrypt";
import { Project } from "./models/project-model.mts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// get environment variables
dotenv.config();

// set up router
const projectRouter = Router();
projectRouter.post("/register", register);
projectRouter.post("/login", login);

// set up auth
async function register(req: Request, res: Response) {
    try {
        const { project_name, description, password } = req.body;

        if (!await checkRequest(req)) {
            return;
        }

        encryptAndStore(project_name, description, password);
    } catch (err) {
        res.status(400).send("Unknown error");
        console.log(err);
    }

    async function encryptAndStore(project_name: string, description: string, password: string) {
        const encryptedPass = await hash(password, 10);

        const newProject: Project = {project_name, description, encryptedPass, participants: []};
        const insertedProj = await addProject(newProject);
        const projWithToken = createAndAddToken(insertedProj);
        res.status(201).json(projWithToken);
    }

    async function checkRequest(req: Request): Promise<Boolean> {
        if (isIncompleteRequest(req.body['project_name'], req.body['password'])) {
            res.status(400).send("Username and password are both required");
            return false;
        }
        
        const oldProject = await getProject(req.body['project_name']);

        if (oldProject) {
            res.status(409).send("Project with this name already exists");
            return false;
        }

        return true;

        function isIncompleteRequest(project_name: string, password: string) {
            return !(project_name && password);
        } 
    }
}

async function login(req: Request, res: Response) {
    try {
        const result = await validateRequest(req);

        if (result) {
            const projWithToken = createAndAddToken(result);
            res.status(200).send(projWithToken);
        } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("Unknown error");
        console.log(err.message);
    }

    async function validateRequest(req: Request) {
        const { project_name, password } = req.body;

        if (isIncompleteRequest(project_name, password)) {
            res.status(400).send("Username and password are both required");
            return null;
        }

        const proj = await getProject(project_name);

        if (proj && await compare(password, proj.encryptedPass)) {
            return proj;
        }

        return null;

        function isIncompleteRequest(project_name: string, password: string) {
            return !(project_name && password);
        }
    }
}

function createAndAddToken(proj: Project) {
    if (!proj.project_name) throw Error("Must pass in an 'inserted project'");

    const token = jwt.sign(
        { project_name: proj.project_name },
        process.env.TOKEN_KEY,
        {
            expiresIn: "5h"
        }
    );

    addTokenTo(proj.project_name, token);
    proj.token = token;
    return proj;
}

export { projectRouter };