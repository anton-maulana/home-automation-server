import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/db';

export class Port extends Model {
  public id!: number;
  public description: string;
  public name: string;
  public value: number;
}

Port.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    value: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: 'Port',
  },
);
