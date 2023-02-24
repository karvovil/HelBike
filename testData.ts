export const testStations = [{
  id: 1,
  name: 'Testiasema nr. 1',
  address: 'Taidonkaari 1'
},{
  id: 2,
  name: 'Toinen',
  address: 'Tiedonkaari 22'
},{
  id: 3,
  name: 'Kolmas',
  address: 'Poratie 333'
},{
  id: 4,
  name: 'asema nr. 4',
  address: 'Tapsitie 4444'
}];

export const testJourneys = [{
  id:                   123,
  departureStationId:   1,
  departureStationName: 'Testiasema nr. 1',
  returnStationId:      2,
  returnStationName:    'Toinen',
  distanceCovered:      43,
  duration:             123
},{
  id:                   124,
  departureStationId:   3,
  departureStationName: 'Kolmas',
  returnStationId:      1,
  returnStationName:    'Testiasema nr. 1',
  distanceCovered:      6128,
  duration:             567
},{
  id:                   125,
  departureStationId:   2,
  departureStationName: 'Toinen',
  returnStationId:      4,
  returnStationName:    'asema nr. 4',
  distanceCovered:      56789,
  duration:             9976
}];