
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { BaseJourney, BaseStation, CSVJourney, CSVStation } from "../types";

export const parseJourneys = () => {
  const csvFilePath = path.resolve(__dirname, '../files/2021-05.csv');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  
  const journeys: BaseJourney[] = [];
  let id = 0;

  parse(fileContent, {
    delimiter: ',',
    columns: true,
    to: 1000,
    on_record: (line: CSVJourney) => {
      if (line["Covered distance (m)"] < 10 || isNaN(line["Covered distance (m)"])) {
        return;
      }
      if (line["Duration (sec.)"] < 10 || isNaN(line["Duration (sec.)"])) {
        return;
      }
      if (!line["Departure station name"] || !isString(line["Departure station name"])) {
        return;
      }
      if (!line["Return station name"] || !isString(line["Return station name"])) {
        return;
      }
      
      id++;
      const baseJourney: BaseJourney = {
        id:                   id,
        departureStationName: line["Departure station name"],
        returnStationName:    line["Return station name"],
        distanceCovered:      line["Covered distance (m)"],
        duration:             line["Duration (sec.)"]
      };
      journeys.push(baseJourney);
    },
  }, (error) => {
    if (error) {
      console.error(error);
    }
  });
  console.log("journeys parsed");
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
      if (!line["ID"] || !isString(line["ID"])) {
        return;
      }
      if (!line["Nimi"] || !isString(line["Nimi"])) {
        return;
      }
      if (!line["Osoite"] || !isString(line["Osoite"])) {
        return;
      }
      const BaseStation: BaseStation = {
        id:      line.ID,
        name:    line.Nimi,
        address: line.Osoite
      };
      stations.push(BaseStation);
    },
  }, (error) => {
    if (error) {
      console.error(error);
    }
  });
  console.log("stations parsed");
  return stations;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};