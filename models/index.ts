import Station from './station';
import Journey from './journey';

Station.hasMany(Journey, {as:'departingJourneys', foreignKey: 'departureStationId'});
Station.hasMany(Journey, {as:'returningJourneys', foreignKey: 'returnStationId'});

void Station.sync();
void Journey.sync();

export { Journey, Station };
