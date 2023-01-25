import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { BaseJourney, BaseStation, CSVJourney, CSVStation } from "../types";

export const parseJourneys = (filePath: string, stationIds: number[]) => {
  
  const csvFilePath = path.resolve(__dirname, filePath);
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  
  const journeys: BaseJourney[] = [];
  
  parse(fileContent, {
    delimiter: ',',
    columns: true,
    //to: 10000,
    on_record: (line: CSVJourney) => {
      if (!line['Departure station id'] || isNaN(line["Departure station id"]) || !stationIds.includes(line['Departure station id']) ) {
        console.log('invalid departure station id', line['Departure station id']);
        return;
      }
      if (!line["Departure station name"] || !isString(line["Departure station name"])) {
        console.log(line);
        return;
      }
      if (!line['Return station id'] || isNaN(line["Return station id"]) || !stationIds.includes(line['Return station id'])){
        console.log('invalid return station id', line['Return station id']);
        return;
      }
      if (!line["Return station name"] || !isString(line["Return station name"])) {
        console.log(line);
        return;
      }
      if (line["Covered distance (m)"] < 10 || isNaN(line["Covered distance (m)"])) {
        return;
      }
      if (line["Duration (sec.)"] < 10 || isNaN(line["Duration (sec.)"])) {
        return;
      }
      
      const journey = {
        departureStationId:   line["Departure station id"],
        departureStationName: line["Departure station name"],
        returnStationId:      line["Return station id"],
        returnStationName:    line["Return station name"],
        distanceCovered:      line["Covered distance (m)"],
        duration:             line["Duration (sec.)"]
      };
      journeys.push(journey);
    },
  }, (error) => {
    if (error) {
      console.error(error);
    }
  });
  return journeys;
};

export const parseStations = () => {
  const csvFilePath = path.resolve(__dirname, '../files/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  
  const stations: BaseStation[] = [];
  
  parse(fileContent, {
    delimiter: ',',
    columns: true,
    on_record: (line: CSVStation) => {
      
      if (isNaN(line["ID"])) {
        return;
      }
      if (!line["Nimi"] || !isString(line["Nimi"])) {
        return;
      }
      if (!line["Osoite"] || !isString(line["Osoite"])) {
        return;
      }
      const baseStation: BaseStation = {
        id:      line.ID,
        name:    line.Nimi,
        address: line.Osoite
      };      
      stations.push(baseStation);
    },
  }, (error) => {
    if (error) {
      console.error(error);
    }
  });
  return stations;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};