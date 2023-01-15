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