import express = require('express');
import Configuration from './configuration';
import SetRoutes from './routes';

const app: express.Application = express();

SetRoutes(app);

app.listen(Configuration.Host.Port, function () {

  console.log('App is listening on port 3000!');
});
