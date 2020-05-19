import { NextFunction, Request, Response, Router } from 'express';
import { apiErrorHandler } from '../handlers/errorHandler';
import MqttHandler from "../handlers/mqttHandler";
import { Schedule } from '../models/Schedule';

export default class ScheduleController {
  constructor() {
  }

  getAllSchedules(req: Request, res: Response, next: NextFunction) {
    Schedule.findAll({ order: ['id'] })
      .then(result =>
        res.json(result)
      )
      .catch(err => {
        apiErrorHandler(err, req, res, 'Fetch All Schedules failed.');
      });
  }

  getScheduleById(req: Request, res: any, next: NextFunction) {
    Schedule.findByPk(req.params.id)
      .then(result => {
        if (result) {
          return res.json(result);
        } else {
          res.status(404).send(`Schedule ${req.params.id} not found.`);
        }
      })
      .catch(err => {
        apiErrorHandler(err, req, res, `Schedule ${req.params.id} failed.`);
      });
  }

  createSchedule(req: Request, res: Response, next: NextFunction) {
    Schedule.create(req.body)
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(err, req, res, 'Creation of Schedule failed.');
      });
  }

  updateSchedule(req: Request, res: Response, next: NextFunction) {
    let body = req.body
    let id = body.id;
    let dt = new Date(body.startAt);
    let date = new Date();
    date.setHours(dt.getHours());
    date.setMinutes(dt.getMinutes());
    body.startAt = date;

    dt = new Date(body.endAt);
    date = new Date();
    date.setHours(dt.getHours());
    date.setMinutes(dt.getMinutes());
    body.endAt = date;


    Schedule.update(body, { where: { id: id.toString() } })
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `updation of Schedule ${req.params.id} is failed.`,
        );
      });
  }

  deleteSchedule(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    Schedule.destroy({ where: { id: id.toString() } })

      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `deletion of Schedule ${req.params.id}  is failed.`,
        );
      });
  }
  getScheduleByRoomId(req: Request, res: any, next: NextFunction) {
    const id = parseInt(req.params.id);
    Schedule.findOne({ where: { fkRoomId: id.toString() } })
      .then(result => {
        if (result) {
          return res.json(result);
        } else {
          return res.json({});
        }
      })
      .catch(err => {
        apiErrorHandler(err, req, res, `Schedule ${req.params.id} failed.`);
      });
  }
}
