export interface BaseStation {
  id:      string
  name:    string
  address: string
}
export interface StationWithTotals extends BaseStation {
  departureTotal: number
  returnTotal:    number
}
export interface CSVStation {
  FID:        number
  ID:         string
  Nimi:       string
  Namn:       string
  Name:       string
  Osoite:     string
  Adress:     string
  Kaupunki:   string
  Stad:       string
  Operaattor: string
  Kapasiteet: number
  x:          number
  y:          number
}
export interface BaseJourney {
  id:                   number
  departureStationName: string
  returnStationName:    string
  distanceCovered:      number
  duration:             number
}
export interface CSVJourney {
  "Departure":              string
  "Return":                 string
  "Departure station id":   string
  "Departure station name": string
  "Return station id":      string
  "Return station name":    string
  "Covered distance (m)":   number
  "Duration (sec.)":        number
}