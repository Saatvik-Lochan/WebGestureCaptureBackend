import { Router, Request, Response } from "express";
import fs from 'fs';
import { parse } from 'csv';

import multer from "multer";
const upload = multer();

const datafilename = 'src/rock_paper_scissors.csv';
const value = fs.readFileSync(datafilename)
console.log("data has loaded");

// set up router
const testRouter = Router();
testRouter.get("/get-csv-data", test);
testRouter.post("/form-data", upload.single('data'),  getFormData);


function getFormData(req: Request, res: Response){
    try {
        console.log(req.body);
        console.log(req.file);
        return res.status(200).send("Complete")
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Unknown error");
    }
}

async function test(req, res){
    res.status(200).send(compress(await unpack(value)));
}

function unpack(value): Promise<string[][]>{
    return new Promise(resolve => {
        const records = parse(value, {
            skip_empty_lines: true
        });
    
        const out: string[][] = [];
        records
            .on("data", (data)=> out.push(data))
            .on("end", () => {resolve(out)});
    });
}

function compress(value: string[][]) {
    // remove header
    value.splice(0, 1);
    const transformed = value.flat().map((element) => parseFloat(element));
    const array = new Float32Array(transformed);
    
    console.log(array);
    return `~${array.buffer.byteLength / 1000000} MB`;
}


export { testRouter };