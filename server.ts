import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import { Application } from 'express';

import Server from './src/index';

const app: Application = express();
const server: Server = new Server(app);
const port: number = parseInt(process.env.port, 10) || 3000;


app.listen(port, '0.0.0.0', function (err: any) {
  if (err) {
    console.log(err);
    return err;
  }
  console.info(`Server running on : http://0.0.0.0:${port}`);
});
