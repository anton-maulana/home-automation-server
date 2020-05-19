import { Application } from 'express';
import RoomController from './controllers/RoomController';
import PortController from './controllers/PortController';
import { LessonValidator, lessonSchema } from './validators/lessonValidator';
import MqttHandler from "./handlers/mqttHandler";
import * as dotenv from 'dotenv';
import ScheduleController from './controllers/ScheduleController';
dotenv.config();

export default class Routes {
  roomController = new RoomController();
  portController = new PortController();
  scheduleController = new ScheduleController();

  lessonValidator = new LessonValidator();
  mqttHandler = MqttHandler.connect(
    process.env.MQTT_HOST,
    process.env.MQTT_USERNAME,
    process.env.MQTT_PASSWORD,
    process.env.MQTT_TOPIC
  )

  constructor(app: Application) {
    // room routes
    app.route('/api/room').get(this.roomController.getAllRooms);
    app.route('/api/room/:id').get(this.roomController.getRoomById);
    app.route('/api/room').post(this.roomController.createRoom);
    app.route('/api/room').put(this.roomController.updateRoom);
    app.route('/api/room/:id').delete(this.roomController.deleteRoom);
    app.route('/api/port').get(this.portController.getAllPorts);
    app.route('/api/port/:id').get(this.portController.getPortById);
    app.route('/api/port').post(this.portController.createPort);
    app.route('/api/port').put(this.portController.updatePort);
    app.route('/api/port/:id').delete(this.portController.deletePort);
    app.route('/api/schedule').get(this.scheduleController.getAllSchedules);
    app.route('/api/schedule/:id').get(this.scheduleController.getScheduleById);
    app.route('/api/schedule').post(this.scheduleController.createSchedule);
    app.route('/api/schedule').put(this.scheduleController.updateSchedule);
    app.route('/api/schedule/:id').delete(this.scheduleController.deleteSchedule);
    app.route('/api/schedule/room-id/:id').get(this.scheduleController.getScheduleByRoomId);
  }
}
