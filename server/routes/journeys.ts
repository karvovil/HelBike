import express from 'express';
import { FullJourney } from '../types';
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';


let journeys: FullJourney[] = [];
const csvFilePath = path.resolve(__dirname, '../files/2021-05.csv');
const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

parse(fileContent, {
  delimiter: ',',
  columns: true,
  to: 200
}, (error, result: FullJourney[]) => {
  if (error) {
    console.error(error);
  }
  journeys = result.slice(0, 200);
}); 

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(journeys);
});


export default router;