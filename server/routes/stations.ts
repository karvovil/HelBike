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
      
      const mapUrl =
      `https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=400x400&markers=color:red%7Clabel:S%7C${station.address}&key=${process.env.REACT_APP_MAPS_API_KEY}`;
      
      const orderedOriginStations = await Journey.findAll({//top origin stations
        group: 'departureStationName',
        where: { returnStationName: station.name },
        order: [['count','DESC']],
        attributes: [
          'departureStationName',
          [sequelize.fn("COUNT", sequelize.col('id')), "count"] 
        ],
      });
      console.log(orderedOriginStations.map(s => s.toJSON()).slice(0,5));
      const topOriginStations = orderedOriginStations.map(s => s.toJSON().departureStationName).slice(0, 5);
      
      const orderedDestinationStations = await Journey.findAll({//top destination stations
        group: 'returnStationName',
        where: { departureStationName: station.name },
        order: [['count','DESC']],
        attributes: [
          'returnStationName',
          [sequelize.fn("COUNT", sequelize.col('id')), "count"] 
        ],
      });
      console.log(orderedDestinationStations.map(s => s.toJSON()).slice(0,5));
      const topDestinationStations = orderedDestinationStations.map(s => s.returnStationName).slice(0, 5);
      
      res.send({
        ...station.toJSON(),
        departingTotal, returningTotal,
        ...departingAverages, ...returningAverages,
        mapUrl,
        topOriginStations, topDestinationStations
      });
    }
  } catch (err) {
    console.log(err);
  }
});
export default router;