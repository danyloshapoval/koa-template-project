'use strict';

const ok = (ctx, json) => {
  let ok = { success: true };
  if (json) ok = { ...ok, ...json };
  ctx.body = ok;
  ctx.status = 200;
};

const test = (ctx, value, code, error, logged = false) => {
  if (!value) ctx.bad(code, error, logged);
};

const bad = (ctx, code, error, logged = false) => {
  const e = {
    success: false,
    error: error instanceof Error ? error.message : error
  };
  ctx.body = e;
  ctx.status = code || 400;
  let err;
  if (typeof error === 'string') {
    err = new Error(error);
  } else if (error instanceof Error) {
    err = error;
  } else {
    err = new Error(JSON.stringify(error));
  }
  err.handled = true;
  err.logged = logged;
  throw err;
};

const set = async (ctx, next) => {
  ctx.ok = ok.bind(ctx, ctx);
  ctx.bad = bad.bind(ctx, ctx);
  ctx.test = test.bind(ctx, ctx);
  return next();
};

module.exports = () => set;
