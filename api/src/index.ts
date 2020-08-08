import express = require('express');
import { HostConfiguration } from './configuration';
import SetRoutes from './routes';
import {
  logger
} from './logging';

const app: express.Application = express();

SetRoutes(app);

app.listen(HostConfiguration.Port, function () {

  logger.info(`App is listening on port ${HostConfiguration.Port}!`);
});
