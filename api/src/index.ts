import express = require('express');
import { Configuration } from './configuration';
import SetRoutes from './routes';
import {
  logger
} from './logging';

const app: express.Application = express();

SetRoutes(app);

app.listen(Configuration.Host.Port, function () {

  logger.info('App is listening on port 3000!');
});
