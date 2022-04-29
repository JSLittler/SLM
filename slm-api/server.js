import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

import appRouter from './routes/routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

const routes = appRouter(app, fs);

const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});
