import { NextFunction, Request, Response, Router } from 'express';
import { apiErrorHandler } from '../handlers/errorHandler';
import MqttHandler from "../handlers/mqttHandler";
import { Port } from '../models/Port';

export default class PortController {
  constructor() {
  }

  getAllPorts(req: Request, res: Response, next: NextFunction) {
    Port.findAll({ order: ['id'] })
      .then(result =>
        res.json(result)
      )
      .catch(err => {
        apiErrorHandler(err, req, res, 'Fetch All Ports failed.');
      });
  }

  getPortById(req: Request, res: any, next: NextFunction) {
    Port.findByPk(req.params.id)
      .then(result => {
        if (result) {
          return res.json(result);
        } else {
          res.status(404).send(`Port ${req.params.id} not found.`);
        }
      })
      .catch(err => {
        apiErrorHandler(err, req, res, `Port ${req.params.id} failed.`);
      });
  }

  createPort(req: Request, res: Response, next: NextFunction) {
    Port.create(req.body)
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(err, req, res, 'Creation of Port failed.');
      });
  }

  updatePort(req: Request, res: Response, next: NextFunction) {
    let body = req.body
    let id = body.id;
    Port.update(body, { where: { id: id.toString() } })
      .then(result => {
        return res.json(result);
      })
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `updation of Port ${req.params.id} is failed.`,
        );
      });
  }

  deletePort(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    Port.destroy({ where: { id: id.toString() } })

      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `deletion of Port ${req.params.id}  is failed.`,
        );
      });
  }
}
