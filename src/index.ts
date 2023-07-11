import express from 'express';
import { projectRouter } from './project-router.mts';
import { participantRouter } from './participant-router.mts';
import { trialRouter } from './trial-router.mts';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.all("*", (_, res: express.Response, next: () => any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

app.use('/project', projectRouter);
app.use('/participants', participantRouter);
app.use('/trial', trialRouter);

app.get('/test', (req, res) => {
    res.send('server is running')
});

// Test route (just for now)
app.get('/gestures', (req, res) => {
    res.send()
})

app.listen(3000);