import express from 'express';
import journeyRouter from './routes/journeys';
import stationRouter from './routes/stations';
import cors from 'cors';
import { connectToDB } from './util/db';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

connectToDB().then( () => {  
  app.use('/api/journeys', journeyRouter);
  app.use('/api/stations', stationRouter);
}).catch(
  err => console.log(err)
);

export default app;