import express from 'express';
import { Journey } from '../models';

const router = express.Router();

router.get('/', (_req, res) => {
  Journey.findAll({ limit: 100 }).then( journeys => {
    res.send(journeys);
  }).catch(err => console.error(err));
});

export default router;