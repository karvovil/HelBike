import Station from './station';
import Journey from './journey';

Station.hasMany(Journey, {as:'departureStations', foreignKey: 'departureStationId'});
Station.hasMany(Journey, {as:'returnStations', foreignKey: 'returnStationId'});

void Station.sync({ alter: true });
void Journey.sync({ alter: true });

export { Journey, Station };
