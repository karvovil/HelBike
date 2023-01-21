import express from 'express';
import { parseJourneys } from '../files/parser';
import { Journey } from '../models';


const journeys = parseJourneys();

const router = express.Router();

router.get('/', (_req, res) => {
  Journey.findAll().then(note => console.log(note)).catch(e => console.log(e));
  res.send(journeys);
});

export default router;