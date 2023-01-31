import supertest from 'supertest';
import app from '../app';
import { Station } from '../models';

const api = supertest(app);
const firstStation = {
  id:      1,
  name:    'Kaivopuisto',
  address: 'Meritori 1',
};
//TODO replace hardcoded values

test('stations are returned as json', async () => {
  await api
    .get('/api/stations')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all 457 stations are returned', async () => {
  const response = await api.get('/api/stations');

  expect(response.body).toHaveLength(457);
});

test('right type of data is returned', async () => {
  const response = await api.get('/api/stations');

  expect(response.body).toBeInstanceOf(Array<Station>);
});

test('first journey from db is returned with results', async () => {
  const response = await api.get('/api/stations');
  const stations = response.body as Station[];
  expect(stations).toContainEqual(firstStation);
});

test('responds with 404 if fetching station that doesnt exist', async () => {
  await api
    .get(`/api/stations/999999999999`)
    .expect(404);
});

test('responds with 404 if id is invalid', async () => {
  await api
    .get(`/api/stations/fpoawjrt9348u+qjf`)
    .expect(404);
});

test('fetching a single station returns right type of object', async () => {

  const station = await api.get(`/api/stations/1`);
  expect(station.body).toMatchObject(firstStation);
});

test('fetches the right station ', async () => {
    
  const station = await api.get(`/api/stations/1`);
  expect(station.body).toEqual({
    ...firstStation,
    departingTotal: 23800,
    returningTotal: 24288});
});
