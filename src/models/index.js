/* const sequelize = require('../config/db'); // Importa a instância do sequelize configurada

const models = {
  Empresa: require('./Empresa')(sequelize),  // Passa o sequelize configurado
  Usuario: require('./Usuario')(sequelize),
  Endereco: require('./Endereco')(sequelize),
};

// Associar os modelos
models.Empresa.associate(models);  // Chama o método de associação da Empresa
models.Usuario.associate(models);  // Chama o método de associação do Usuario
models.Endereco.associate(models);  // Chama o método de associação do Endereco

module.exports = models;
 */