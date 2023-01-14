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

export default router;
