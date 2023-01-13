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