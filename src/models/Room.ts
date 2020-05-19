import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/db';

export class Room extends Model {
  public id!: number;
  public description: string;
  public active: boolean;
  public name: string;
  public fkPortId: number;
  public isSchedule: boolean;
}

Room.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN },
    name: { type: DataTypes.STRING },
    fkPortId: { type: DataTypes.INTEGER },
    isSchedule: { type: DataTypes.BOOLEAN }
  },
  {
    sequelize,
    tableName: 'Room',
  },
);
