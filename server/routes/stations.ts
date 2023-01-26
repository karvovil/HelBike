import express from 'express';
import { Journey, Station } from '../models';
import { sequelize } from '../util/db';

const router = express.Router();
  
router.get('/', (_req, res) => {

  Station.findAll().then( (stations) => {
    res.send(stations);
  }).catch( err => console.error(err));
});

router.get('/:id', (req, res) => {

  Station.findOne({
    where: {id: req.params.id},
    attributes: { 
      include: [
        [sequelize.fn("COUNT", sequelize.fn('DISTINCT', sequelize.col('departingJourneys.id'))), "departingTotal" ],
        [sequelize.fn("COUNT", sequelize.fn('DISTINCT', sequelize.col('returningJourneys.id'))), "returningTotal"]
      ] 
    },
    include: [
      {
        model: Journey,
        as: 'departingJourneys',
        attributes: [],
      },
      {
        model: Journey,
        as: 'returningJourneys',
        attributes: [],
      }
    ],
  })
    .then( (station) => {
      if (!station){
        res.status(404).send('Sorry, cant find that ');
      }else{
        console.log(station);
        
        res.json(station);
      }
    }).catch( err => console.error(err));
});
export default router;