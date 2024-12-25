const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const User = require('../models/User');

module.exports = {
  async login(req, res) {
    const { cpf, password } = req.body;

    try {
      // Buscar o usuário pelo CPF
      const user = await User.findOne({ where: { cpf } });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Comparar a senha fornecida com a senha criptografada no banco
      const passwordMatch = await bcrypt.compare(password, user.password); // Corrigido aqui
       return res.send(`${passwordMatch}`);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      // Gerar o token JWT
      const token = jwt.sign(
        { id: user.id, cpf: user.cpf },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Retornar o token
      return res.json({
        message: 'Login bem-sucedido',
        token,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  },
};
