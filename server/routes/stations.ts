import express from 'express';
import { BaseStation } from '../types';

const router = express.Router();

const stations: Array<BaseStation> = [
  {name: "Hanasaari",      address: "Hanasaarenranta 1"},
  {name: "Keilalahti",     address: "Keilalahdentie 2" },
  {name: "Westendinasema", address: "Westendintie 1"   }
];
  
router.get('/', (_req, res) => {
  res.send(stations);
});

router.get('/:id', (req, res) => {
  const name = req.params.id;
  const station = stations.find(s => s.name === name);
  res.send(station);
});

export default router;
