import express from 'express';
import { BaseJourney } from '../types';

const router = express.Router();

const journeys: Array<BaseJourney> = [
  { "id": 1, "dep": "Laajalahden aukio", "ret": "Teljäntie",        "dis": 2043, "dur": 500 },
  { "id": 2, "dep": "Töölöntulli",       "ret": "Pasilan asema",    "dis": 1870, "dur": 611 },
  { "id": 3, "dep": "Näkinsilta",        "ret": "Vilhonvuorenkatu", "dis": 1025, "dur": 399 }
];
  
router.get('/', (_req, res) => {
  res.send(journeys);
});


export default router;