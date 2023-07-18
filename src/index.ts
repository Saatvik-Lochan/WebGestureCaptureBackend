import express from 'express';
import { projectRouter } from './project-router.mts';
import { participantRouter } from './participant-router.mts';
import { trialRouter } from './trial-router.mts';
import { testRouter } from './test.mts';
import { appendDataRouter } from './append-data-router.mts';

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
app.use('/participants', participantRouter); // manages participants
app.use('/trial', trialRouter); // deals with browser side client 
app.use('/data', appendDataRouter); // deals with browser data transfer 
// app.use('/test', testRouter);

app.listen(3000);