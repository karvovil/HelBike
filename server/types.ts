export interface BaseJourney {
  id:  number;
  dep: string;
  ret: string;
  dis: number;
  dur: number;
}
export interface BaseStation {
  name:    string;
  address: string;
}
export interface FullStation {
  FID:        number
  ID:         number
  Nimi:       string
  Namn:       string
  Name:       string
  Osoite:     string
  Adress:     string
  Kaupunki:   string
  Stad:       string
  Operaattor: string
  Kapasiteet: string
  x:          number
  y:          number
}

export interface FullJourney{
  "Departure":              string
  "Return":                 string
  "Departure station id":   number
  "Departure station name": string
  "Return station id":      number
  "Return station name":    string
  "Covered distance (m)":   number
  "Duration (sec.)":        number

}