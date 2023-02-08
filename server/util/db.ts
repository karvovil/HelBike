import { Sequelize } from 'sequelize';
import { parseJourneys, parseStations } from './parser';
import { Journey, Station } from '../models';
import * as fs from "fs";
import { DBPATH } from './config';

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
  console.log(dbExists);
  
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
  } catch (err) {
    console.error("Can not connect to db", err);
    return  process.exit(1);
  }

  if (!dbExists) {
    await populateDatabase();
  }
  return;
};

export const populateDatabase = async () => {

  try {
    const stations = await parseStations(
      './Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv'
    );
    await Station.bulkCreate(stations);
    const stationIds = stations.map(s => s.id);

    console.log('parsing journeys 1/3');
    await Journey.bulkCreate(
      await parseJourneys('./2021-05.csv', stationIds)
    );  

    console.log('parsing journeys 2/3');
    await Journey.bulkCreate(
      await parseJourneys('./2021-06.csv', stationIds)
    );  

    console.log('parsing journeys 3/3');
    await Journey.bulkCreate(
      await parseJourneys('./2021-07.csv', stationIds)
    );  
    
  } catch (err) {
    console.log(err);
  }  
};