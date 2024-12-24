require('dotenv').config();

module.exports = {
  // Configurações do Banco de Dados
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',

  // Configurações de Autenticação JWT
  JWT_SECRET: process.env.JWT_SECRET || 'defaultSecretKey',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',

  // Token da Aplicação
  APP_TOKEN_SECRET_KEY: process.env.APP_TOKEN_SECRET_KEY || 'defaultAppToken',

  // Outras Configurações
  PORT: process.env.PORT || 3000,
};
