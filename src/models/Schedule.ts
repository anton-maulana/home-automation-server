import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/db';

export class Schedule extends Model {
  public id!: number;
  public fkRoomId: number;
  public startAt: any;
  public endAt: any;
}

Schedule.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fkRoom: { type: DataTypes.INTEGER },
    startAt: { type: DataTypes.DATE },
    endAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: 'Room',
  },
);
