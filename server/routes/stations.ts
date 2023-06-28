import express from 'express';
import {  Journey, Station } from '../models';
import { sequelize } from '../util/db';

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

      const averages = await Station.findOne({
        where: { id: req.params.id },
        attributes: [
          [sequelize.fn('AVG', sequelize.col('departingJourneys.duration')), 'departingDurationAverage'],
          [sequelize.fn('AVG', sequelize.col('returningJourneys.duration')), 'returningDurationAverage'],
        ],
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
          },
        ],
        raw: true,
        group: ['Station.id'],
      });
      console.log(averages);
      
      res.send({
        ...station.toJSON(),
        departingTotal, returningTotal,
        ...averages
      });
    }
  } catch (err) {
    console.log(err);
  }
});
export default router;