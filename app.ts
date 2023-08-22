import express from 'express';
import journeyRouter from './routes/journeys';
import stationRouter from './routes/stations';
import cors from 'cors';
import { connectToDB } from './util/db';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use('/api/stations', stationRouter);
app.use('/api/journeys', journeyRouter);

if(process.env.NODE_ENV==='production'){
  app.get('/*', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
}

connectToDB()
  .then(_v => console.log('Connected to db'))
  .catch(e => console.error(e));

export default app;