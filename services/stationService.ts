import { Journey, Station } from '../models';
import { sequelize } from '../util/db';
import axios from 'axios';

const getAverages = async (id: string, direction: 'departing' | 'returning') => {
  const averages = await Station.findOne({
    where: { id: id },
    attributes: [[
      sequelize.fn('AVG', sequelize.col(`${direction}Journeys.distance_covered`)),
      `${direction}DistanceAverage`
    ], [
      sequelize.fn('AVG', sequelize.col(`${direction}Journeys.duration`)),
      `${direction}DurationAverage`
    ]],
    include: [{
      model: Journey,
      as: `${direction}Journeys`,
      attributes: [],
    }],
    raw: true,
    group: ['Station.id'],
  });
  return averages;
};

export const getAllStations = async () => {
  try {
    const stations = await Station.findAll();
    return stations;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const getOneStation = async (id: string) => {
  try {
    const station = await Station.findByPk(id);
    if (!station) {
      return undefined;
    } else {
      const departingTotal = await station.countDepartingJourneys();
      const returningTotal = await station.countReturningJourneys();
      const departingAverages = await getAverages(id, 'departing');
      const returningAverages = await getAverages(id, 'returning');

      const mapUrl =
        `https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=600x400&markers=color:red%7Clabel:S%7C${station.address}&key=${process.env.MAPS_API_KEY}`;
      const mapPic: { data: ArrayBuffer } | void = await axios
        .get(mapUrl, { responseType: 'arraybuffer' })
        .catch(err => console.error(err));
      const base64MapPic = mapPic ? Buffer.from(mapPic.data).toString('base64') : '';

      const orderedOriginStations = await Journey.findAll({
        group: 'departureStationName',
        where: { returnStationName: station.name },
        order: [['count', 'DESC']],
        attributes: [
          'departureStationName',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
      });
      const topOriginStations = orderedOriginStations
        .map(s => s.toJSON().departureStationName).slice(0, 5);

      const orderedDestinationStations = await Journey.findAll({
        group: 'returnStationName',
        where: { departureStationName: station.name },
        order: [['count', 'DESC']],
        attributes: [
          'returnStationName',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
      });
      const topDestinationStations = orderedDestinationStations
        .map(s => s.returnStationName).slice(0, 5);

      return ({
        ...station.toJSON(),
        departingTotal, returningTotal,
        ...departingAverages, ...returningAverages,
        base64MapPic,
        topOriginStations, topDestinationStations
      });
    }
  } catch (err) {
    console.error(err);
    return undefined;
  }
};