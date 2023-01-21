import express from 'express';
import { BaseStation, BaseJourney, StationWithTotals } from '../types';
import { parseJourneys, parseStations } from '../files/parser';
import { Station } from '../models';

const stations: BaseStation[] = parseStations();
const journeys: BaseJourney[] = parseJourneys();

const router = express.Router();
  
router.get('/', (_req, res) => {
  Station.findAll().then(stations => console.log(stations)).catch(e => console.log(e));
  res.send(stations);
});

router.get('/:id', (req, res) => {
  const name = req.params.id;
  const station = stations.find(s => s.name === name);
  if (station){
    const departureTotal = journeys.filter(j => j.departureStationName == station.name).length;
    const returnTotal = journeys.filter(j => j.returnStationName == station.name).length;
    const stationWithTotals: StationWithTotals = {...station, departureTotal, returnTotal};
    res.send(stationWithTotals);
  } else{
    res.status(404).send('Sorry, cant find that');
  }
});

export default router;
