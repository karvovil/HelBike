import { Model, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute, HasManyCountAssociationsMixin } from 'sequelize';
import { sequelize } from '../util/db';

class Station extends Model
<InferAttributes<Station>, InferCreationAttributes<Station>>{
  declare id: number;
  declare name: string;
  declare address: string;
  declare departingTotal?: NonAttribute<number>;
  declare returningTotal?: NonAttribute<number>;
  declare countDepartingJourneys: HasManyCountAssociationsMixin;
  declare countReturningJourneys: HasManyCountAssociationsMixin;
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