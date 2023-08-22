import { Sequelize } from 'sequelize';
import { parseJourneys, parseStations } from './parser';
import { Journey, Station } from '../models';
import * as fs from 'fs';
import { DBPATH } from './config';
import { testStations, testJourneys } from './testData';
import * as path from 'path';

export const sequelize = new Sequelize(
  'bikeJourneyDB',
  'testUser',
  'testPass',
  {
    dialect: 'sqlite',
    storage: DBPATH,
    logging: false,
  });

export const connectToDB = async () => {
  const dbExists = fs.existsSync(DBPATH);
  if (dbExists) {
    console.log('using existing db');
  }

  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error('Can not connect to db', err);
    return process.exit(1);
  }

  if (!dbExists) {
    await populateDatabase();
  }
  return;
};

export const populateDatabase = async () => {
  const dataFiles = [
    'Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv',
    '2021-05.csv', '2021-06.csv', '2021-07.csv']
    .map(f => path.resolve('files', f));

  const dataFilesExist = dataFiles.reduce(
    (a, b) => a && fs.existsSync(b), true
  );

  if (process.env.NODE_ENV === 'test' || !dataFilesExist) {
    await Station.bulkCreate(testStations);
    await Journey.bulkCreate(testJourneys);
    console.log('using test data');
  } else {
    try {
      const stations = await parseStations(dataFiles[0]);
      await Station.bulkCreate(stations);
      const stationIds = stations.map(s => s.id);

      console.log('parsing journeys 1/3');
      await Journey.bulkCreate(
        await parseJourneys(dataFiles[1], stationIds)
      );
      console.log('parsing journeys 2/3');
      await Journey.bulkCreate(
        await parseJourneys(dataFiles[2], stationIds)
      );
      console.log('parsing journeys 3/3');
      await Journey.bulkCreate(
        await parseJourneys(dataFiles[3], stationIds)
      );
      console.log('using data parsed from .csv files');

    } catch (err) {
      console.log(err);
    }
  }
};