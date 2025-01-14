const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const ClassificacaoProfissional = require('./ClassificacaoProfissional');
const Usuario = require('../Usuario');

// Definindo a tabela de relação entre usuários e classificações de habilidades
const HabilidadeProfissionalUsuario = sequelize.define(
  'HabilidadeProfissionalUsuario',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario, // Referencia a tabela de usuários
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    idHabilidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ClassificacaoProfissional, // Referencia a tabela de classificações
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'habilidades_profissionais_usuarios',
    timestamps: true, // Adiciona createdAt e updatedAt
    freezeTableName: true, // Evita pluralização automática
  }
);

// Exporta o modelo
module.exports = HabilidadeProfissionalUsuario;
