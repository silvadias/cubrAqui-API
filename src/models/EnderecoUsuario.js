const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const EnderecoMixin = require('../mixin/EnderecoMixin');
const Usuario = require('./Usuario');  // Importa o modelo Empresa

const EnderecoUsuario = sequelize.define('Endereco_Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
  ...EnderecoMixin,  // Inclui os campos do EnderecoMixin
}, {
  tableName: 'enderecos_usuarios',
  timestamps: true,
});

// Definindo a associação: EnderecoEmpresa pertence a uma Empresa
EnderecoEmpresa.belongsTo(Usuario, {
  foreignKey: 'idUsuario',  // A chave estrangeira é o campo 'idEmpresa'
  targetKey: 'id',  // A chave primária da Empresa
});

module.exports = EnderecoUsuario;
