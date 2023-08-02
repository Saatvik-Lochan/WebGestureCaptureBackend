import { Router, Response, Request, NextFunction } from "express";
import { verifyToken } from "./auth.mts";
import { UserAuthRequest } from "./models/user-auth-request.mts";
import { addLocator, getLocatorFromShortCode } from "./database-util.mts";
import path from "path";
import { writeFileSync } from "fs";
import { appendArrayToFile } from "./gesture-data-router.mts";
import multer from "multer";

export interface GestureClassLocator {
    project_name: string;
    gesture_name: string;
}

interface ShortCodeRequest extends Request {
    filePath: string
}

async function verifyShortCode(req: ShortCodeRequest, res: Response, next: NextFunction) {
    try {
        const shortCode =
            req.params.shortcode || req.body.shortcode || req.query.shortcode;

        const filePath = await getFileFromShortCode(shortCode);
        req.filePath = filePath

        next()
    } catch (err) {
        return res.status(400).send("Invalid shortcode");
    }
}

async function getFileFromShortCode(shortCode: string) {
    const locator = await getLocatorFromShortCode(shortCode);
    return getFilePathFromGestureLocator(locator);

    function getFilePathFromGestureLocator(locator: GestureClassLocator) {
        const fileName = `${locator.project_name}-${locator.gesture_name}.csv`;
        const filePath = path.join(__dirname, "demonstration_files", fileName);
        return filePath;
    }
}

const upload = multer();

export const demonstrationRouter = Router();
demonstrationRouter.get("/get-shortcode/:gesture_name", verifyToken, getShortCode);
demonstrationRouter.post("/start-transfer/:shortcode", verifyShortCode, startTransfer);
demonstrationRouter.post("/append-data/:shortcode", upload.single('data'), verifyShortCode, appendData);


async function startTransfer(req: ShortCodeRequest, res: Response) {
    try {
        writeFileSync(req.filePath, "");
        return res.status(201).send("Transfer started");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Unknown server error");
    }
}

async function appendData(req: ShortCodeRequest, res: Response) {
    try {
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
            return res.status(200).send(shortCode)
        else
            return res.status(500).send("Unknown server error");

    } catch (err) {
        return res.status(400).send("Invalid request");
    }
}