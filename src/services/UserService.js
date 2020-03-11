'use strict';

const models = require('../models');
const config = require('../config');
const { jwt } = require('../libs');

class UserService {
  static async signUp (email, password) {
    const user = await models.user.create({
      email: email,
      password: password
    });

    const secret = process.env.JWT_AUTH_SECRET;
    const token = await jwt.encode({ id: user.id },
      secret,
      config.jwt.maxAge);

    return { token: token };
  }

  static async signIn (email, password) {
    const user = await models.user.findOne({
      where: {
        email: email
      }
    });
    if (!user) throw new Error('User not found');

    const valid = await user.isValidPassword(password);
    if (!valid) throw new Error('User not found');

    const secret = process.env.JWT_AUTH_SECRET;
    const token = await jwt.encode({ id: user.id },
      secret,
      config.jwt.maxAge);

    return { token: token };
  }

  static async getByToken (token) {
    const secret = process.env.JWT_AUTH_SECRET;
    const { id } = await jwt.decode(token, secret);
    const user = await models.user.findByPk(id, {
      attributes: {
        exclude: ['password', 'deletedAt']
      }
    });
    if (!user) throw new Error('User not found');
    return user;
  }
}

module.exports = UserService;
