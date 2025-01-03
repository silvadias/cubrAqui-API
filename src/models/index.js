const Sequelize = require('sequelize');
const sequelize = new Sequelize(/* conexão com o banco */);

const models = {
  Empresa: require('./Empresa')(sequelize, Sequelize.DataTypes),
  Usuario: require('./Usuario')(sequelize, Sequelize.DataTypes),
  Endereco: require('./Endereco')(sequelize, Sequelize.DataTypes),
};

// Associar os modelos
models.Empresa.associate(models);  // Chama o método de associação da Empresa
models.Usuario.associate(models);  // Chama o método de associação do Usuario
models.Endereco.associate(models);  // Chama o método de associação do Endereco

module.exports = models;
