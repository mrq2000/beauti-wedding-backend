/* eslint-disable no-console */
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' }); // Do not move this line under !!!

import 'reflect-metadata';
import './app/http/controllers';

import { createConnection } from 'typeorm';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';

import { RootRoute } from './app/helpers/decorator';

createConnection()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // Create Route
    app.use(RootRoute);

    app.listen(3000);

    console.log('Express server has started on port 3000');
  })
  .catch((error) => console.log(error));
