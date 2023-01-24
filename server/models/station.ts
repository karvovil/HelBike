import { Model, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { sequelize } from '../util/db';

class Station extends Model
<InferAttributes<Station>, InferCreationAttributes<Station>>{
  declare id: number;
  declare name: string;
  declare address: string;
  declare departureStations?: NonAttribute<Array<number>>;
  declare returnStations?: NonAttribute<Array<number>>;
}

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