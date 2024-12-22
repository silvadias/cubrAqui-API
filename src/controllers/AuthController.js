const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

module.exports = {
  login(req, res) {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'admin123') {
      const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
      return res.json({ token });
    }
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
};
