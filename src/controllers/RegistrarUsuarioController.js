const Criptografia = require('../middlewares/criptografia');
const Usuario = require('../models/Usuario');

module.exports = {
  async registrar(req, res) {
    const { cpf, nomeCompleto, email, senha } = req.body;

    try {
      // Verifica se o usuário já existe pelo CPF
      const localizarCPF = await Usuario.findOne({ where: { cpf } });
      if (localizarCPF) {
        return res.status(400).json({ message: 'Usuário já existe com este CPF' });
      }

      // Verifica se o email já está cadastrado
      const localizarEmail = await Usuario.findOne({ where: { email } });
      if (localizarEmail) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

      // Criptografa a senha 
      const senhaCriptografada = await Criptografia.gerar(senha);

      // Cria o usuário
      const user = await Usuario.create({
        cpf,
        nomeCompleto,
        email,
        senha: senhaCriptografada, // Salva a senha criptografada
      });

      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        userId: user.id,
      });

    } catch (error) {
      console.error('❌ Erro ao registrar usuário:', error);
      return res.status(500).json({ message: 'Erro ao registrar', falha: error.message });
    }
  },
};
