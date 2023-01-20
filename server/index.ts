import express from 'express';
import journeyRouter from './routes/journeys';
import stationRouter from './routes/stations';
import cors from 'cors';
import { Sequelize } from 'sequelize';

const initializeDB = async () => {

  const sequelize = new Sequelize(
    'bikeJourneyDB',
    'testUser',
    'testPass',
    {
      dialect: 'sqlite',
      storage: "./db/database.sqlite"
    });
  
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.close();
    console.log('Connection has been CLOSED successfully.');
  } catch (err) {
    console.error("Can not connect", err);
  }
};

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;
initializeDB().catch(error => console.error("Can not connect", error));

app.get('/hello', (_req, res) => {
  console.log('someone visited');
  res.send('world');
});

app.use('/api/journeys', journeyRouter);
app.use('/api/stations', stationRouter);

app.listen(PORT, () => {
  console.log(`Server launched on port ${PORT}`);
});

