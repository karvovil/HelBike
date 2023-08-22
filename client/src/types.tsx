export interface BaseStation {
  id: number
  name: string
  address: string
}
export interface StationWithTotals extends BaseStation {
  departureTotal: number
  returnTotal: number
}
export interface CSVStation {
  FID: number
  ID: number
  Nimi: string
  Namn: string
  Name: string
  Osoite: string
  Adress: string
  Kaupunki: string
  Stad: string
  Operaattor: string
  Kapasiteet: number
  x: number
  y: number
}
export interface BaseJourney {
  id: number
  departureStationId: number
  departureStationName: string
  returnStationId: number
  returnStationName: string
  distanceCovered: number
  duration: number
}
export interface CSVJourney {
  'Departure': string
  'Return': string
  'Departure station id': number
  'Departure station name': string
  'Return station id': number
  'Return station name': string
  'Covered distance (m)': number
  'Duration (sec.)': number
}
export type Order = 'asc' | 'desc';
