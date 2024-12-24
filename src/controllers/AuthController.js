const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env'); // Certifique-se que esses valores estão corretos.
const User = require('../models/User');  // Seu modelo de usuário

module.exports = {
  async login(req, res) {
    const { cpf, password } = req.body;

    try {
      // Busca o usuário pelo CPF (não criptografado)
      const user = await User.findOne({ where: { cpf } });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Compara a senha fornecida com a senha criptografada armazenada no banco
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      // Gerar o token JWT com o id e cpf do usuário
      const token = jwt.sign(
        { id: user.id, cpf: user.cpf },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } // Tempo de expiração do token
      );

      // Retorna o token de autenticação
      return res.json({
        message: 'Login bem-sucedido',
        token,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
  }
};
