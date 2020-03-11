'use strict';

module.exports = {
  apiPath: '/api', // API start path
  accessLogs: true, // Print access logs
  saltRounds: 10, // Rounds of hashing the password
  proxy: false, // Is app under reverse proxy
  host: '127.0.0.1',
  port: 3001,
  dbDialect: 'postgres', // DB type,
  jwt: {
    maxAge: 600, // Auth JWT token lifetime in seconds
    header: 'auth' // Header with JWT token
  }
};
