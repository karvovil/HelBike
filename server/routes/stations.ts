import express from 'express';
import { FullJourney, FullStation } from '../types';
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

let stations: FullStation[] = [];
const csvFilePath = path.resolve(__dirname, '../files/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv');
const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  
parse(fileContent, {
  delimiter: ',',
  columns: true,
}, (error, result: FullStation[]) => {
  if (error) {
    console.error(error);
  }
  stations = result;
});

let journeys: FullJourney[] = [];
const csvFilePath2 = path.resolve(__dirname, '../files/2021-05.csv');
const fileContent2 = fs.readFileSync(csvFilePath2, { encoding: 'utf-8' });

parse(fileContent2, {
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
  res.send(stations);
});

router.get('/:id', (req, res) => {
  const name = req.params.id;
  const station = stations.find(s => s.Nimi === name);
  const startingFromTotal = journeys.filter(j => j['Departure station id'] == station?.ID).length;
  const endingToTotal = journeys.filter(j => j['Return station id'] == station?.ID).length;
  const stationWithTotals = {...station, startingFromTotal, endingToTotal};
  res.send(stationWithTotals);
});

export default router;
