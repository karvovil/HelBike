import express from 'express';
import journeyRouter from './routes/journeys';
import stationRouter from './routes/stations';
import cors from 'cors';

import { connectToDB } from './util/db';
import { parseJourneys, parseStations } from './files/parser';
import { Journey, Station } from './models';

import * as fs from "fs";
import * as path from "path";
const filePath = path.resolve(__dirname, '../server/db/database.sqlite');
fs.unlinkSync(filePath);

const stations = parseStations();
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/hello', (_req, res) => {
  console.log('someone visited');
  res.send('world');
});

app.use('/api/journeys', journeyRouter);
app.use('/api/stations', stationRouter);

const start = async () => {
  await connectToDB();
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
  app.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
  });
};
void start();
