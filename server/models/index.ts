import Station from './station';
import Journey from './journey';

Station.hasMany(Journey, {as:'departingJourneys', foreignKey: 'departureStationId'});
Station.hasMany(Journey, {as:'returningJourneys', foreignKey: 'returnStationId'});

void Station.sync({ alter: true });
void Journey.sync({ alter: true });

export { Journey, Station };
