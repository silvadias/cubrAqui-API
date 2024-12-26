/**
 * Controller responsável por gerenciar o registro de novos usuários.
 */

const Criptografia = require('../middlewares/criptografia');
const Usuario = require('../models/Usuario');

module.exports = {
  /**
   * @function registrar
   * @description Registra um novo usuário no sistema após validações.
   *
   * @param {Object} req - Objeto de requisição do Express contendo os dados do usuário.
   * @param {Object} res - Objeto de resposta do Express usado para retornar mensagens.
   *
   * @returns {Object} Resposta JSON indicando sucesso ou falha no registro.
   */
  async registrar(req, res) {
    // Extrai os dados do corpo da requisição
    const { cpf, nomeCompleto, email, senha } = req.body;

    try {
      // 🛡️ Verifica se o CPF já está cadastrado
      const localizarCPF = await Usuario.findOne({ where: { cpf } });
      if (localizarCPF) {
        return res.status(400).json({ message: 'Usuário já existe com este CPF' });
      }

      // 🛡️ Verifica se o email já está cadastrado
      const localizarEmail = await Usuario.findOne({ where: { email } });
      if (localizarEmail) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

      // 🔒 Criptografa a senha antes de salvar no banco
      const senhaCriptografada = await Criptografia.gerar(senha);

      // 📝 Cria um novo usuário no banco de dados
      const usuarioCriado = await Usuario.create({
        cpf,
        nomeCompleto,
        email,
        senha: senhaCriptografada,
      });

      // ✅ Resposta de sucesso
      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        userId: usuarioCriado.id,
      });

    } catch (error) {
      // ⚠️ Captura e registra erros no processo
      console.error('❌ Erro ao registrar usuário:', error);
      return res.status(500).json({
        message: 'Erro ao registrar',
        falha: error.message,
      });
    }
  },
};
