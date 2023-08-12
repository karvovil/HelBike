import express from 'express';
import journeyRouter from './routes/journeys';
import stationRouter from './routes/stations';
import cors from 'cors';
import { connectToDB } from './util/db';
import 'dotenv/config';
//Deploy with this to move local db to fly volume.
//Also remove db from .dockerignore
/*
import fs from 'fs';
fs.copyFile('./db/database.sqlite', '/flydb/database.sqlite', (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
});
*/

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

connectToDB().then(v=>console.log(v)).catch(e=>console.log(e));

export default app;