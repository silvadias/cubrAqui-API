const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const User = db.define('User', {
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
  fullName: {
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
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  registrationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'User',
  timestamps: false,
  freezeTableName: true,
});

// Hook para criptografar a senha antes de criar um usuário
User.beforeCreate(async (user, options) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;
