import express from 'express';
import config from '../config';

const isProduction = config.env === 'production';
const server = express();

if (!isProduction) {
  server.use((req, res, next) => {
    webpackIsomorphicTools.refresh();
    next();
  });
}
