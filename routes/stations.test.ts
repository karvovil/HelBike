import supertest from 'supertest';
import { testStations } from '../util/testData';
import app from '../app';
import { Station } from '../models';

const api = supertest(app);
const firstStation = testStations[0];

test('stations are returned as json', async () => {
  await api
    .get('/api/stations')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all 4 stations are returned from test db', async () => {
  const response = await api.get('/api/stations');

  expect(response.body).toHaveLength(4);
});

test('right type of data is returned', async () => {
  const response = await api.get('/api/stations');

  expect(response.body).toBeInstanceOf(Array<Station>);
});

test('first journey from test db is returned with results', async () => {
  const response = await api.get('/api/stations');
  const stations = response.body as Station[];
  expect(stations).toContainEqual(firstStation);
});

test('responds with 404 if fetching station that doesnt exist', async () => {
  await api
    .get('/api/stations/999999999999')
    .expect(404);
});

test('responds with 404 if id is invalid', async () => {
  await api
    .get('/api/stations/fpoawjrt9348u+qjf')
    .expect(404);
});

test('fetching a single station returns right type of object', async () => {

  const station = await api.get('/api/stations/1');
  expect(station.body).toMatchObject(firstStation);
});

test('fetches the right station ', async () => {
    
  const response = await api.get('/api/stations/1'); 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {base64MapPic, ...station} = response.body;
  expect(station).toEqual({
    ...firstStation,
    departingTotal: 1,
    returningTotal: 1,
    departingDistanceAverage: 43,
    departingDurationAverage: 123,
    returningDistanceAverage: 6128,
    returningDurationAverage: 567,
    topOriginStations: ['Kolmas'],
    topDestinationStations: ['Toinen'],
  });
  expect(base64MapPic).toBeDefined();
});
