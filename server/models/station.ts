import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelize } from '../util/db';

class Station extends Model <InferAttributes<Station>, InferCreationAttributes<Station>>{}

Station.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
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