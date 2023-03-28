import express from 'express';
import journeyRouter from './routes/journeys';
import stationRouter from './routes/stations';
import cors from 'cors';
import { connectToDB } from './util/db';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use('/api/stations', stationRouter);
app.use('/api/journeys', journeyRouter);
connectToDB().then(v=>console.log(v)).catch(e=>console.log(e));

export default app;