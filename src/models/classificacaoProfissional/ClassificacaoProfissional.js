const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const HabilidadeProfissionalUsuario = require('./HabilidadeProfissionalUsuario');

const ClassificacaoProfissional = sequelize.define('ClassificacaoProfissional', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  idPai: { // Renomeado para refletir um contexto mais claro
    type: DataTypes.INTEGER,
    allowNull: true, // Permite null para itens na raiz
    references: {
      model: 'classificacoes_profissionais',
      key: 'id',
    },
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Garante que o nível seja >= 0
    },
  },
}, {
  tableName: 'classificacoes_profissionais',
  timestamps: false,
  freezeTableName: true, // Evita pluralização automática
  indexes: [
    {
      unique: true,
      fields: ['nome', 'idPai'], // Garantir unicidade nome + idPai
    },
  ],
});


module.exports = ClassificacaoProfissional;
