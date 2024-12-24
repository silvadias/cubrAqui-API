const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  async register(req, res) {
    const { cpf, fullName, email, password } = req.body;

    try {
      // Verifica se o usuário já existe pelo CPF ou email
      const existingUser = await User.findOne({ where: { cpf } });
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe com este CPF' });
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar um novo usuário
      const user = await User.create({
        cpf,
        fullName,
        email,
        password: hashedPassword, // Salva a senha criptografada
      });

      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        userId: user.id,
      });
    } catch (error) {
      console.error('❌ Erro ao cadastrar usuário:', error);
      msg = error.errors[0].message;
      return res.status(500).json({ message: 'Erro no servidor', falha:msg} );
    }
  },
};
