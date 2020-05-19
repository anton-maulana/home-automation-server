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
    fkRoomId: { type: DataTypes.INTEGER },
    startAt: { type: 'TIMESTAMP' },
    endAt: { type: 'TIMESTAMP' }
  },
  {
    sequelize,
    tableName: 'Schedule',
  },
);
