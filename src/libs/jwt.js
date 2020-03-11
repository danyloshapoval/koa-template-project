'use strict';

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
  encode: async (data, secret, seconds) => {
    return promisify(jwt.sign)(data, secret, { expiresIn: seconds });
  },
  decode: async (token, secret) => {
    return promisify(jwt.verify)(token, secret);
  }
};
