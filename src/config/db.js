const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = require('./env'); // Importa do env.js

const sequelize = new Sequelize(
  DB_NAME,   // Nome do banco
  DB_USER,   // Usuário
  DB_PASSWORD, // Senha
  {
    host: DB_HOST, // Host do banco de dados
    port: DB_PORT, // Porta do banco de dados
    dialect: DB_DIALECT, // Tipo do banco de dados
  }
);

module.exports = sequelize;

