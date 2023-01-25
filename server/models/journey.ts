import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../util/db';

class Journey extends Model
<InferAttributes<Journey>, InferCreationAttributes<Journey>>{
  declare id: CreationOptional<number>;
  declare departureStationName: string;
  declare returnStationName: string;
  declare distanceCovered: number;
  declare duration: number;
}

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
    type: DataTypes.INTEGER,
    allowNull: false
  },

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'journey'
});

export default Journey;