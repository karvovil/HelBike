import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../util/db';

class Station extends Model {}

Station.init({
  id: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'station'
});

export default Station;