import express from 'express';
import { getAllStations, getOneStation } from '../services/stationService';
const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_req, res) => {
  const stations = await getAllStations();
  res.send(stations);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', async (req, res) => {
  const station = await getOneStation(req.params.id);
  if (!station) {
    res.status(404).send('Sorry, cant find that ');
  } else {
    res.send(station);
  }
});
export default router;