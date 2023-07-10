import { Router, Response, Request } from "express";
import { addProject, getProject } from "./database-util";
import { hash } from "bcrypt";

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




        // TODO: Check if user in correct format
    } catch (err) {
        console.log(err);
    }

    async function encryptAndStore(name: string, description: string, password: string) {
        const encryptedPass = await hash(password, 10);

        const newProject = new Project(name, description, encryptedPass);
        const insertedProject = await addProject(newProject);
  
        
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