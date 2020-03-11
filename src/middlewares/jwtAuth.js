'use strict';

const { UserService } = require('../services');
const config = require('../config');

const jwtAuth = async (ctx, next) => {
  const token = ctx.get(config.jwt.header);
  try {
    const user = await UserService.getByToken(token);
    ctx.state.user = user;
    return next();
  } catch (err) {
    ctx.bad(400, 'Not authenticated');
  }
};

module.exports = _ => jwtAuth;
