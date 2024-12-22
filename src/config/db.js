const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nome do banco
  process.env.DB_USER,      // Usuário
  process.env.DB_PASSWORD,  // Senha
  {
    host: process.env.DB_HOST,  // Nome do serviço Docker
    port: process.env.DB_PORT,  // Porta interna MySQL
    dialect: process.env.DB_DIALECT || 'mysql', // Tipo do banco de dados
  }
);

module.exports = sequelize;
