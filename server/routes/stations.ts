import express from 'express';
import { Journey, Station } from '../models';

const router = express.Router();
  
router.get('/', (_req, res) => {

  Station.findAll().then( (stations) => {
    res.send(stations);
  }).catch( err => console.error(err));
});

router.get('/:id', (req, res) => {

  Station.findOne({
    where: {id: req.params.id},
    include: [
      {
        model: Journey,
        as: 'departureStations',
        attributes: ['id']
      },
      {
        model: Journey,
        as: 'returnStations',
        attributes: ['id']
      }
    ],
  })
    .then( (station) => {
      if (!station){
        res.status(404).send('Sorry, cant find that ');
      }else{
        res.json({  
          id:             station.id,
          name:           station.name,
          address:        station.address,
          departureTotal: station.departureStations?.length,
          returnTotal:    station.returnStations?.length
        });
      }
    }).catch( err => console.error(err));
});
export default router;