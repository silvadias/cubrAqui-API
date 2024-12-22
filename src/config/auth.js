module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
    jwtExpiresIn: '1h',
  };
  