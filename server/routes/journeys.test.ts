import supertest from 'supertest';
import app from '../app';
import { Journey } from '../models';

const api = supertest(app);
const firstJourney = {
  id:                   1,
  departureStationId:   94,
  departureStationName: 'Laajalahden aukio',
  returnStationId:      100,
  returnStationName:    'Teljäntie',
  distanceCovered:      2043,
  duration:             500
};
//TODO replace hardcoded values

test('journeys are returned as json', async () => {
  await api
    .get('/api/journeys')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('100 journeys are returned', async () => {
  const response = await api.get('/api/journeys');

  expect(response.body).toHaveLength(100);
});

test('right type of data is returned', async () => {
  const response = await api.get('/api/journeys');

  expect(response.body).toBeInstanceOf(Array<Journey>);
});

test('first journey from db is returned with results', async () => {
  const response = await api.get('/api/journeys');
  const journeys = response.body as Journey[];
  expect(journeys).toContainEqual(firstJourney);
});

/* test('responds with 404 if fetching journey that doesnt exist', async () => {
  await api
    .get(`/api/journeys/999999999999`)
    .expect(404);
});

test('responds with 404 if id is invalid', async () => {
  await api
    .get(`/api/journeys/fpoawjrt9348u+qjf`)
    .expect(404);
});

test('', async () => {

  const journey = await api.get(`/api/journeys/1`);
  expect(journey.body).toBeInstanceOf(Journey);
}); */
