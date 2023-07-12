/* eslint-disable no-console */
import ServerlessHttp from 'serverless-http';
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

const app = express();
createConnection()
  .then(async () => {
    const WHITE_LIST = ['http://localhost:8080', 'http://localhost:9000', 'https://taothiepcuoi.com'];
    const corsOptions = {
      origin: function (origin, callback) {
        if (WHITE_LIST.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(bodyParser.json());

    // Create Route
    app.use(RootRoute);

    app.listen(3000);

    console.log('Express server has started on port 3000');
  })
  .catch((error) => console.log(error));

exports.handler = ServerlessHttp(app);
