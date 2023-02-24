import supertest from 'supertest';
import { testJourneys } from '../../testData';
import app from '../app';
import { Journey } from '../models';

const api = supertest(app);
const queryparameters = '?currentPage=0&orderBy=id&orderDirection=asc&rowsPerPage=100';

const firstJourney = testJourneys[0];

test('journeys are returned as json', async () => {
  await api
    .get(`/api/journeys${queryparameters}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all 3 journeys are returned from test db', async () => {
  const response = await api
    .get(`/api/journeys${queryparameters}`);

  expect(response.body.rows).toHaveLength(3);
});

test('right type of data is returned', async () => {
  const response = await api
    .get(`/api/journeys${queryparameters}`);

  expect(response.body.rows).toBeInstanceOf(Array<Journey>);
});
  
test('first journey from test db is returned with results', async () => {
  const response = await api
    .get(`/api/journeys${queryparameters}`);
  const journeys = response.body.rows as Journey[];
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
