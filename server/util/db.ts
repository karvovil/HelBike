import { Sequelize } from 'sequelize';
import { parseJourneys, parseStations } from '../files/parser';
import { Journey, Station } from '../models';
import * as fs from "fs";
import * as path from "path";

export const sequelize = new Sequelize(
  'bikeJourneyDB',
  'testUser',
  'testPass',
  {
    dialect: 'sqlite',
    storage: "./db/database.sqlite",
    logging: false,
  });

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
  } catch (err) {
    console.error("Can not connect to db", err);
    return process.exit(1);
  }
  return null;
};
export const populateDatabase = async () => {

  const filePath = path.resolve(__dirname, '../db/database.sqlite');
  fs.unlinkSync(filePath);

  const stations = parseStations();
  const stationIds = stations.map(s => s.id);

  try {
    const journeys = [
      parseJourneys('../files/2021-05.csv', stationIds),
      parseJourneys('../files/2021-06.csv', stationIds),
      parseJourneys('../files/2021-07.csv', stationIds),
    ];

    await Station.bulkCreate(stations);
    await Journey.bulkCreate(journeys[0]);  
    await Journey.bulkCreate(journeys[1]);  
    await Journey.bulkCreate(journeys[2]);
  } catch (err) {
    console.log(err);
  }  
};