'use strict';

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

module.exports = {
  dotEnv: _ => {
    dotenv.config({
      path: path.join(__dirname,
        '..',
        '..',
        '.env.' + process.env.NODE_ENV)
    });
  },
  getFilesInDirSync: (dir, ext, exludes = []) => {
    return fs.readdirSync(dir)
      .filter(file => file.endsWith(ext) && !exludes.includes(file))
      .map(file => path.join(dir, file));
  },
  isDevEnv: _ => process.env.NODE_ENV === 'development'
};
