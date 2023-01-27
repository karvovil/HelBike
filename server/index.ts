import express from 'express';
import journeyRouter from './routes/journeys';
import stationRouter from './routes/stations';
import cors from 'cors';

import { connectToDB, populateDatabase } from './util/db';

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
  await populateDatabase();
  app.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
  });
};
void start();
