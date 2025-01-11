const { DataTypes } = require('sequelize');
const db = require('../config/db');
const HabilidadeProfissionalUsuario = require('./classificacaoProfissional/HabilidadeProfissionalUsuario') 


const Usuario = db.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cpf: {
    type: DataTypes.STRING(11),
    unique: true,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [11, 11],
    },
  },
  nomeCompleto: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
  freezeTableName: true,
});

module.exports = Usuario;
