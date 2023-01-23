import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../util/db';

class Journey extends Model
<InferAttributes<Journey>, InferCreationAttributes<Journey>>{}

Journey.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departureStationName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  returnStationName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  distanceCovered: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.TEXT,
    allowNull: false
  },

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'journey'
});

export default Journey;