'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const log = require('./log')('app');
const { sequelize } = require('./loaders');
const {
  logger,
  error,
  response
} = require('./middlewares');
const routes = require('./routes');

module.exports = async _ => {
  await sequelize.sync();

  const app = new Koa();

  if (config.accessLogs) app.use(logger());
  app.use(error());
  app.use(response());
  app.use(bodyParser());
  app.use(routes());

  const port = process.env.PORT || config.port || 8080;
  const host = process.env.HOST || config.host || '0.0.0.0';
  app.proxy = config.proxy;

  app.listen(port, host, () => {
    log.info(`Server started ${host}:${port}`);
  });
};
