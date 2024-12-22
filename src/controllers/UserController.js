const User = require('../models/User');

module.exports = {
  async getAllUsers(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
};
