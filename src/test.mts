import { Router, Response } from "express";
import fs from 'fs';
import { parse } from 'csv';

const datafilename = 'src/rock_paper_scissors.csv';
const value = fs.readFileSync(datafilename)
console.log("data has loaded");

// set up router
const testRouter = Router();
testRouter.get("/get-csv-data", test);

function test(req, res){
    res.send(compress(value));
}

function compress(value){
    const records = parse(value, {
        skip_empty_lines: true
    });

    const out = []
    records.on('readable', (data)=>out.push(1));

    return out;
}

export { testRouter };