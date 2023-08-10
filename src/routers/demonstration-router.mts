import { Router, Response, Request, NextFunction } from "express";
import { verifyToken } from "../auth.mts";
import { UserAuthRequest } from "../models/user-auth-request.mts";
import { addLocator, getLocatorFromShortCode } from "../database-util.mts";
import path, { dirname } from "path";
import { existsSync, writeFileSync, createReadStream } from "fs";
import { appendArrayToFile } from "./gesture-data-router.mts";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface GestureClassLocator {
    project_name: string;
    gesture_id: string;
}

interface GestureDemonstrationRequest extends Request {
    filePath: string
    locator: GestureClassLocator;
}

async function verifyShortCode(req: GestureDemonstrationRequest, res: Response, next: NextFunction) {
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

async function verifyGestureFile(req: GestureDemonstrationRequest, res: Response, next: NextFunction) {
    try {
        const { project_name, gesture_id } = req.params;

        if (!(project_name && gesture_id)) {
            return res.status(400).send("Must include project_name and gesture_id");
        }

        const filePath = getFilePathFromGestureLocator({ project_name, gesture_id });

        if (!existsSync(filePath)) {
            return res.status(204).send("This demonstration has not been recorded yet");
        }

        req.filePath = filePath;
        req.locator = { project_name, gesture_id };

        next();

    } catch (error) {
        console.log('%cerror demonstration-router.mts line:44 ', 'color: red; display: block; width: 100%;', error);
        return res.status(500).send("Unknown server error")
    }
}

function getFilePathFromGestureLocator(locator: GestureClassLocator) {
    const fileName = `${locator.project_name}-${locator.gesture_id}.csv`;
    const filePath = path.join(__dirname, "..", "demonstration_files", fileName);
    return filePath;
}

const upload = multer();

export const demonstrationRouter = Router();
demonstrationRouter.get("/get-shortcode/:gesture_id", verifyToken, getShortCode);
demonstrationRouter.post("/start-transfer/:shortcode", verifyShortCode, startTransfer);
demonstrationRouter.post("/append-data/:shortcode", upload.single('data'), verifyShortCode, appendData);
demonstrationRouter.get("/get-demonstration/:project_name/:gesture_id", verifyGestureFile, getDemonstration);

demonstrationRouter.get("/shortcode-exists/:shortcode", verifyShortCode, shortCodeExists);
demonstrationRouter.get("/demonstration-exists/:project_name/:gesture_id", verifyGestureFile, demonstrationExists)

async function shortCodeExists(req: GestureDemonstrationRequest, res: Response) {
    return res.status(200).send(req.locator);
}

async function demonstrationExists(req: Request, res: Response) {
    return res.status(200).send("This gesture has a recorded demonstration")
}

async function getDemonstration(req: GestureDemonstrationRequest, res: Response) {
    try {
        res.setHeader('Content-Type', 'text/csv');

        const fileStream = createReadStream(req.filePath);
        fileStream.pipe(res);

        fileStream.on('close', () => {
            res.status(200).send();
            console.log(`Sent ${req.filePath} successfully`)
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Unknown server error");
    }
}

async function startTransfer(req: GestureDemonstrationRequest, res: Response) {
    try {
        writeFileSync(req.filePath, "");
        return res.status(201).send(req.locator);

    } catch (err) {
        console.log(err);
        return res.status(500).send("Unknown server error");
    }
}

async function appendData(req: GestureDemonstrationRequest, res: Response) {
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
        const { gesture_id } = req.params;
        const { project_name } = req.user;

        const shortCode = await addLocator({ project_name, gesture_id });

        if (shortCode)
            return res.status(200).send(shortCode);

        // should have exited by now
        return res.status(500).send("Unknown server error");

    } catch (err) {
        return res.status(400).send("Invalid request");
    }
}