import { Router, Response } from "express";
import fs from 'fs';

const datafilename = '../test_data/rock_paper_scissors.csv';
const value = fs.readFileSync(datafilename)

// set up router
const testRouter = Router();
testRouter.get("/get-csv-data", test);

function test(req, res){
    res.send(value);
}

export { testRouter };