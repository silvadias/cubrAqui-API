const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Caminho correto para sua configuração Sequelize

const Empresa = sequelize.define(
  'Empresa',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: false,
    },
    razaoSocial: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nomeFantasia: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    emailCorporativo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    matricialidade: {
      type: DataTypes.ENUM('matriz', 'filial'),
      allowNull: false,
    },
    subordinacao: {
      type: DataTypes.INTEGER,
      references: {
        model: 'empresas', // Nome exato da tabela no banco
        key: 'id',
      },
    },
    dataCadastro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'empresas',
    timestamps: false,
  }
);

module.exports = Empresa;
