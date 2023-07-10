import { Router, Response, Request } from "express";
import { addProject, getProject, addTokenTo } from "./database-util";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";


// get environment variables
require('dotenv').config();

// set up router
let router = Router();

router.post("/register", register)
router.post("/login", login)

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

        function createAndAddToken(proj: Project) {
            if (!proj._id) throw Error("Must pass in an 'inserted project'");

            const token = sign(
                { project_id: proj._id, name: proj.name },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h"
                }
            );
    
            addTokenTo(proj.name, token);

            res.status(201).json(proj);
        }
    }

    async function checkRequest(req: Request): Promise<Boolean> {
        if (isIncompleteRequest(req.body['name'], req.body['password'])) {
            res.status(400).send("Username and password");
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

function login(req: Request, res: Response) {

}