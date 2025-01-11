const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const ClassificacaoProfissional = require('./ClassificacaoProfissional'); // Ajuste o caminho conforme necessário


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
        model: 'usuarios', // Nome da tabela de usuários
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // Exclusão em cascata
    },
    idHabilidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'classificacoes_profissionais', // Nome da tabela de habilidades
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // Exclusão em cascata
    },
  },
  {
    tableName: 'habilidades_profissionais_usuarios',
    timestamps: true, // Adiciona createdAt e updatedAt
    freezeTableName: true, // Evita pluralização automática
  }
);
HabilidadeProfissionalUsuario.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
HabilidadeProfissionalUsuario.belongsTo(ClassificacaoProfissional, { foreignKey: 'idHabilidade', as: 'habilidade' });


module.exports = HabilidadeProfissionalUsuario;
