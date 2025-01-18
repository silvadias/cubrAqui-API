const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const EnderecoMixin = require('../mixin/EnderecoMixin');
const Empresa = require('./Empresa');  // Importa o modelo Empresa

const EnderecoEmpresa = sequelize.define(
  'Endereco_Empresa', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    ...EnderecoMixin,  // Inclui os campos do EnderecoMixin
  }, {
    tableName: 'enderecos_empresas',
    timestamps: true,
  });

// Definindo a associação: EnderecoEmpresa pertence a uma Empresa
EnderecoEmpresa.belongsTo(Empresa, 
  {
  foreignKey: 'idEmpresa',  // A chave estrangeira é o campo 'idEmpresa'
  targetKey: 'id',  // A chave primária da Empresa
  });

module.exports = EnderecoEmpresa;
