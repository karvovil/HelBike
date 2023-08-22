import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import { BaseJourney, BaseStation, CSVJourney, CSVStation } from '../types';
import { finished } from 'stream/promises';

export const parseJourneys = async (filePath: string, stationIds: number[]) => {

  const csvFilePath = path.resolve(__dirname, filePath);
  const journeys: BaseJourney[] = [];

  const parser = fs
    .createReadStream(csvFilePath)
    .pipe(parse({
      delimiter: ',',
      columns: true,
      on_record: (line: CSVJourney) => {

        const journey: BaseJourney = {
          departureStationId: line['Departure station id'],
          departureStationName: line['Departure station name'],
          returnStationId: line['Return station id'],
          returnStationName: line['Return station name'],
          distanceCovered: line['Covered distance (m)'],
          duration: line['Duration (sec.)']
        };
        return journey;
      },
    }));
  parser.on('readable', () => {
    let journey: BaseJourney;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    while ((journey = parser.read()) !== null) {
      if (validateJourney(journey, stationIds)) {
        journeys.push(journey);
      }
    }
  });

  parser.on('error', (err) => {
    console.error(err.message);
  });

  await finished(parser);
  return [...new Set(journeys)];
};

export const parseStations = async (filePath: string) => {

  const csvFilePath = path.resolve(__dirname, filePath);
  const stations: BaseStation[] = [];

  const parser = fs
    .createReadStream(csvFilePath)
    .pipe(parse({
      delimiter: ',',
      columns: true,
      on_record: (line: CSVStation) => {
        const baseStation: BaseStation = {
          id: line.ID,
          name: line.Nimi,
          address: line.Osoite
        };
        return (baseStation);
      },
    }));

  parser.on('readable', () => {
    let station: BaseStation;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    while ((station = parser.read()) !== null) {
      if (validateStation(station)) {
        stations.push(station);
      }
    }
  });
  parser.on('error', function (err) {
    console.error(err.message);
  });

  await finished(parser);
  return stations;
};

const validateStation = (station: BaseStation) => {

  if (isNaN(station.id)) {
    return false;
  }
  if (!station.name || !isString(station.name)) {
    return false;
  }
  if (!station.address || !isString(station.address)) {
    return false;
  }
  return true;
};

const validateJourney = (journey: BaseJourney, stationIds: number[]) => {

  if (!journey.departureStationId || isNaN(journey.departureStationId) || !stationIds.includes(journey.departureStationId)) {
    return false;
  }
  if (!journey.departureStationName || !isString(journey.departureStationName)) {
    return false;
  }
  if (!journey.returnStationId || isNaN(journey.returnStationId) || !stationIds.includes(journey.returnStationId)) {
    return false;
  }
  if (!journey.returnStationName || !isString(journey.returnStationName)) {
    return false;
  }
  if (journey.distanceCovered < 10 || isNaN(journey.distanceCovered)) {
    return false;
  }
  if (journey.duration < 10 || isNaN(journey.duration)) {
    return false;
  }
  return true;
};
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};