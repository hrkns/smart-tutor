import express = require('express');
import Configuration from './config';

console.log(Configuration);

const app: express.Application = express();

app.get('/', function (req, res) {

  res.send('Hello World!');
});

app.listen(Configuration.Host.Port, function () {

  console.log('App is listening on port 3000!');
});
