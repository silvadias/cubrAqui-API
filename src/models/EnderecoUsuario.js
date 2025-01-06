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

// Definindo a associação: EnderecoUsuario pertence a uma Usuario
EnderecoEmpresa.belongsTo(Usuario, {
  foreignKey: 'idUsuario',  // A chave estrangeira é o campo 'idUsuario'
  targetKey: 'id',  // A chave primária do Usuario
});

module.exports = EnderecoUsuario;
