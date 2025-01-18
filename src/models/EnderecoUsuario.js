const { DataTypes }   = require('sequelize');
const sequelize       = require('../config/db');
const EnderecoMixin   = require('../mixin/EnderecoMixin');
const Usuario         = require('./Usuario'); // Importa corretamente o modelo Usuario

const EnderecoUsuario = sequelize.define(
  'Endereco_Usuario', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      references: {
        model: Usuario, // Faz referência à tabela Usuario
        key: 'id', // A chave primária do modelo Usuario
      },
    },
    ...EnderecoMixin, // Inclui os campos do EnderecoMixin
  }, {
    tableName: 'enderecos_usuarios',
    timestamps: true,
});

// Definindo a associação correta
EnderecoUsuario.belongsTo(Usuario, 
  {
    foreignKey: 'idUsuario', // A chave estrangeira na tabela EnderecoUsuario
    targetKey: 'id', // A chave primária na tabela Usuario
    as: 'usuario', // Alias para facilitar chamadas
  });

module.exports = EnderecoUsuario;
