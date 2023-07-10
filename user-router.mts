import { Router, Response, Request } from "express";
import { addProject, getProject, addTokenTo } from "./database-util.mts";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Project } from "./models/project-model.mts";
import dotenv from "dotenv";

// get environment variables
dotenv.config();

// set up router
const userRouter = Router();
userRouter.post("/register", register);
userRouter.post("/login", login);

async function register(req: Request, res: Response) {
    try {
        const { name, description, password } = req.body;

        if (!await checkRequest(req)) {
            return;
        }

        encryptAndStore(name, description, password);
    } catch (err) {
        console.log(err);
    }

    async function encryptAndStore(name: string, description: string, password: string) {
        const encryptedPass = await hash(password, 10);

        const newProject: Project = {name, description, encryptedPass};
        const insertedProj = await addProject(newProject);
        createAndAddToken(insertedProj);
        res.status(201).json(insertedProj);
    }

    async function checkRequest(req: Request): Promise<Boolean> {
        if (isIncompleteRequest(req.body['name'], req.body['password'])) {
            res.status(400).send("Username and password are both required");
            return false;
        }
        
        const oldProject = await getProject(req.body['name']);

        if (oldProject) {
            res.status(409).send("Project with this name already exists");
            return false;
        }

        return true;

        function isIncompleteRequest(name: string, password: string) {
            return !(name && password);
        } 
    }
}

async function login(req: Request, res: Response) {
    try {
        const result = await validateRequest(req);

        if (result) {
            createAndAddToken(result);
            res.send("Successful login");
        } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (err) {
        console.log(err.message);
    }

    async function validateRequest(req: Request) {
        const { name, password } = req.body;

        if (isIncompleteRequest(name, password)) {
            res.status(400).send("Username and password are both required");
            return null;
        }

        const proj = await getProject(name);

        if (proj && await compare(password, proj.encryptedPass)) {
            return proj;
        }

        return null;

        function isIncompleteRequest(name: string, password: string) {
            return !(name && password);
        }
    }
}

function createAndAddToken(proj: Project) {
    if (!proj._id) throw Error("Must pass in an 'inserted project'");

    const token = jwt.sign(
        { project_id: proj._id, name: proj.name },
        process.env.TOKEN_KEY,
        {
            expiresIn: "5h"
        }
    );

    addTokenTo(proj.name, token);
}

export { userRouter };