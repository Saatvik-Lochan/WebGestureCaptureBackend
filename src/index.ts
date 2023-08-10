import express from 'express';
import { projectRouter } from './routers/project-router.mts';
import { participantRouter } from './routers/participant-router.mts';
import { trialRouter } from './routers/trial-router.mts';
import { gestureDataRouter } from './routers/gesture-data-router.mts';
import fs from 'fs';
import dotenv from 'dotenv';
import https from 'https';
import { demonstrationRouter } from './routers/demonstration-router.mts';

dotenv.config();


const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.all("*", (_, res: express.Response, next: () => any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

app.use('/project', projectRouter); // handles register and login
app.use('/participant', participantRouter); // manages participants
app.use('/trial', trialRouter); // deals with browser side client 
app.use('/gesture-data', gestureDataRouter) // deals with sending gesture data
app.use('/demonstration', demonstrationRouter) // deals with recording and sending gesture demonstrations

if (process.env.USE_CERTIFICATE == "true") {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERTIFICATE)
    };

    https.createServer(options, app).listen(8000, () => {
        console.log("Server listening on port 8000: https")
    });
} else {
    app.listen(3000, () => {
        console.log("Server listening on port 3000: http")
    });
}
