import express from 'express';
import {  Station } from '../models';

const router = express.Router();
  
router.get('/', (_req, res) => {

  console.log('getting stations from DB');
  Station.findAll().then( (stations) => {
    res.send(stations);
  }).catch( err => console.error(err));
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', async (req, res) => {

  try {
    const station = await Station.findByPk(req.params.id);
    if (!station){
      res.status(404).send('Sorry, cant find that ');
    }else{
      const departingTotal = await station.countDepartingJourneys();
      const returningTotal = await station.countReturningJourneys();
      res.send({...station.toJSON(), departingTotal, returningTotal});
    }
  } catch (err) {
    console.log(err);
  }
});
export default router;