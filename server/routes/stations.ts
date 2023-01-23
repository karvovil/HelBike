import express from 'express';
import { Station } from '../models';

const router = express.Router();
  
router.get('/', (_req, res) => {

  Station.findAll().then( (stations) => {
    res.send(stations);
  }).catch( err => console.error(err));
});

router.get('/:id', (req, res) => {
  Station.findByPk(req.params.id).then( (station) => {
    if (!station){
      res.status(404).send('Sorry, cant find that ');
    }else{
      const departureTotal = 1;
      const returnTotal = 1;
      const stationWithTotals = {...station.toJSON(), departureTotal, returnTotal};
      console.log(stationWithTotals);
      
      res.send(stationWithTotals);
    }
  }).catch( err => console.error(err));
});
export default router;