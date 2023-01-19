import express from 'express';
import { parseJourneys } from '../files/parser';

const journeys = parseJourneys();

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(journeys);
});


export default router;