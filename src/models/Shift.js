const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Shift = db.define('Shift', {
  shiftTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Shift;
