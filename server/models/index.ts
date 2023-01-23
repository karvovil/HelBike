import Station from './station';
import Journey from './journey';

Station.hasOne(Journey, {as: 'departureStation'});
Station.hasOne(Journey, {as: 'returnStation'});

void Station.sync({ alter: true });
void Journey.sync({ alter: true });

export { Journey, Station };
