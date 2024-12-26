const Usuario = require('../models/Usuario');

module.exports = {
  async getAllUsers(req, res) {
    const usuarios = await Usuario.findAll();
    return res.json(usuarios);
  }
};
