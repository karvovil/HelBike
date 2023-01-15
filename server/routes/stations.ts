import express from 'express';
import { FullStation } from '../types';
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

const router = express.Router();
  
router.get('/', (_req, res) => {
  res.send(stations);
});

router.get('/:id', (req, res) => {
  const name = req.params.id;
  const station = stations.find(s => s.Nimi === name);
  res.send(station);
});

export default router;
