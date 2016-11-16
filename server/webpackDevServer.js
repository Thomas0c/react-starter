import express from 'express';

import config from '../config';
import {webpackMiddleware, webpackHotMiddleware} from './middleware/webpackMiddleware';

const isProduction = config.env === 'production';
const server = express();

if (!isProduction) {
  server.use((req, res, next) => {
    webpackIsomorphicTools.refresh();
    next();
  });
}
