import express from 'express';
import {  Journey, Station } from '../models';
import { sequelize } from '../util/db';

const router = express.Router();
console.log(process.env);

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

      const departingAverages = await Station.findOne({
        where: { id: req.params.id },
        attributes: [[
          sequelize.fn('AVG', sequelize.col('departingJourneys.distance_covered')),
          'departingDistanceAverage'
        ],[
          sequelize.fn('AVG', sequelize.col('departingJourneys.duration')),
          'departingDurationAverage'
        ]],
        include: [{
          model: Journey,
          as: 'departingJourneys',
          attributes: [],
        }],
        raw: true,
        group: ['Station.id'],
      });
      const returningAverages = await Station.findOne({
        where: { id: req.params.id },
        attributes: [[
          sequelize.fn('AVG', sequelize.col('returningJourneys.distance_covered')),
          'returningDistanceAverage'
        ],[
          sequelize.fn('AVG', sequelize.col('returningJourneys.duration')),
          'returningDurationAverage'
        ]],
        include: [{
          model: Journey,
          as: 'returningJourneys',
          attributes: [],
        }],
        raw: true,
        group: ['Station.id'],
      });
      console.log({...station.toJSON(),
        departingTotal, returningTotal,
        ...departingAverages, ...returningAverages
      });
      
      res.send({
        ...station.toJSON(),
        departingTotal, returningTotal,
        ...departingAverages, ...returningAverages
      });
    }
  } catch (err) {
    console.log(err);
  }
});
export default router;