import { Router, Response, Request, NextFunction } from "express";
import { verifyToken } from "./auth.mts";
import { UserAuthRequest } from "./models/user-auth-request.mts";
import { addLocator, getLocatorFromShortCode } from "./database-util.mts";
import path, { dirname } from "path";
import { existsSync, writeFileSync, createReadStream } from "fs";
import { appendArrayToFile } from "./gesture-data-router.mts";
import multer from "multer";
import { fileURLToPath } from "url";
import { createInterface } from "readline";
import { Gesture } from "./models/project-model.mts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface GestureClassLocator {
    project_name: string;
    gesture_name: string;
}

interface ShortCodeRequest extends Request {
    filePath: string
    locator: GestureClassLocator;
}

async function verifyShortCode(req: ShortCodeRequest, res: Response, next: NextFunction) {
    try {
        const shortCode =
            req.params.shortcode || req.body.shortcode || req.query.shortcode;

        const locator = await getLocatorFromShortCode(shortCode)
        const filePath = getFilePathFromGestureLocator(locator)
        req.filePath = filePath;
        req.locator = locator;

        next();
    } catch (error) {
        return res.status(400).send("Invalid shortcode");
    }
}

async function getFileFromShortCode(shortCode: string) {
    const locator = await getLocatorFromShortCode(shortCode);
    return getFilePathFromGestureLocator(locator);   
}

function getFilePathFromGestureLocator(locator: GestureClassLocator) {
    const fileName = `${locator.project_name}-${locator.gesture_name}.csv`;
    const filePath = path.join(__dirname, "..", "demonstration_files", fileName);
    return filePath;
}

const upload = multer();

export const demonstrationRouter = Router();
demonstrationRouter.get("/get-shortcode/:gesture_name", verifyToken, getShortCode);
demonstrationRouter.post("/start-transfer/:shortcode", verifyShortCode, startTransfer);
demonstrationRouter.post("/append-data/:shortcode", upload.single('data'), verifyShortCode, appendData);
demonstrationRouter.get("/get-demonstration/:project_name/:gesture_name", getDemonstration);


async function getDemonstration(req: Request, res: Response) {
    try {
        const { project_name, gesture_name } = req.params;

        if (!(project_name && gesture_name)) {
            return res.status(400).send("Must include project_name and gesture_name");
        } 

        const filePath = getFilePathFromGestureLocator({ project_name, gesture_name });
        
        if (!existsSync(filePath)) {
            return res.status(204).send("This demonstration has not been recorded yet");
        }
        
        res.setHeader('Content-Type', 'application/json');
        
        const fileStream = createReadStream(filePath);
        fileStream.pipe(res);
        
        fileStream.on('close', () => {
            res.status(200).send();
            console.log(`Sent successfully`)
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Unknown server error");
    }
}

async function startTransfer(req: ShortCodeRequest, res: Response) {
    try {
        writeFileSync(req.filePath, "");
        return res.status(201).send(req.locator);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Unknown server error");
    }
}

async function appendData(req: ShortCodeRequest, res: Response) {
    try {
        console.log(req.filePath);
        await appendArrayToFile(req.filePath, req.file.buffer.buffer)
        return res.status(201).send("Data received");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Unknown server error. You might not have started the transfer.");
    }
}

async function getShortCode(req: UserAuthRequest, res: Response) {
    try {
        const { gesture_name } = req.params;
        const { project_name } = req.user;

        const shortCode = await addLocator({ project_name, gesture_name });

        if (shortCode)
            return res.status(200).send(shortCode);
        
        // should have exited by now
        return res.status(500).send("Unknown server error");

    } catch (err) {
        return res.status(400).send("Invalid request");
    }
}