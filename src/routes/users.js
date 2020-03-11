'use strict';

const Router = require('koa-router');
const { UserService } = require('../services');
const { jwtAuth } = require('../middlewares');

const router = new Router({
  prefix: '/users'
});

router.get('/', jwtAuth(), async ctx => {
  ctx.ok(ctx.state.user.get());
});

router.post('/signUp', async ctx => {
  const body = ctx.request.body;
  ctx.test(body.email, 400, 'No email');
  ctx.test(body.password, 400, 'No password');

  try {
    const result = await UserService.signUp(body.email, body.password);
    ctx.ok(result);
  } catch (err) {
    ctx.bad(400, err);
  }
});

router.post('/signIn', async ctx => {
  const body = ctx.request.body;
  ctx.test(body.email, 400, 'No email');
  ctx.test(body.password, 400, 'No password');

  try {
    const result = await UserService.signIn(body.email, body.password);
    ctx.ok(result);
  } catch (err) {
    ctx.bad(400, err);
  }
});

module.exports = router;
