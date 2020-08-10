import express = require('express');
import bodyParser = require('body-parser')
import {
  HostConfiguration
} from './configuration';
import SetRoutes from './routes';
import {
  logger
} from './logging';

const cors = require('cors');
const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
SetRoutes(app);

app.listen(HostConfiguration.Port, function() {

  logger.info(`App is listening on port ${HostConfiguration.Port}!`);
});
