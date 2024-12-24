const { JWT_SECRET, JWT_EXPIRES_IN, APP_TOKEN_SECRET_KEY } = require('./env');

module.exports = {
  jwtSecret: JWT_SECRET || 'defaultSecretKey',
  jwtExpiresIn: JWT_EXPIRES_IN || '1h',
  appTokenSecretKey: APP_TOKEN_SECRET_KEY || 'defaultAppToken',
};
