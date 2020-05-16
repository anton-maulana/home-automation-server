import { NextFunction, Request, Response, Router } from 'express';
import { apiErrorHandler } from '../handlers/errorHandler';
import MqttHandler from "../handlers/mqttHandler";
import { Room } from '../models/Room';
import { Op } from 'sequelize';

export default class RoomController {
  constructor() {
  }

  getAllRooms(req: Request, res: Response, next: NextFunction) {
    //let query = req.query; // $_GET["id"]
    let query = req.query;
    let whereOptions: {};

    if (query && query?.type === "home")
      whereOptions = {
        "fkPortId": {
          [Op.ne]: null
        }
      };


    Room.findAll({ order: ['id'], where: whereOptions })
      .then(result =>
        res.json(result)
      )
      .catch(err => {
        apiErrorHandler(err, req, res, 'Fetch All Rooms failed.');
      });
  }

  getRoomById(req: Request, res: any, next: NextFunction) {
    Room.findByPk(req.params.id)
      .then(result => {
        if (result) {
          return res.json(result);
        } else {
          res.status(404).send(`Room ${req.params.id} not found.`);
        }
      })
      .catch(err => {
        apiErrorHandler(err, req, res, `Room ${req.params.id} failed.`);
      });
  }

  createRoom(req: Request, res: Response, next: NextFunction) {
    Room.create(req.body)
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(err, req, res, 'Creation of Room failed.');
      });
  }

  updateRoom(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    let id = body.id;
    Room.update(body, { where: { id: id.toString() } })
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `updation of Room ${req.params.id} is failed.`,
        );
      });
  }

  deleteRoom(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    Room.destroy({ where: { id: id.toString() } })
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `deletion of Room ${req.params.id}  is failed.`,
        );
      });
  }
}
