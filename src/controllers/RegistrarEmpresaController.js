const Criptografia = require('../middlewares/criptografia');
const Empresa = require('../models/Empresa');

/**
 * Controller para registrar uma nova empresa.
 */
module.exports = {
  /**
   * Registra uma nova empresa no sistema após validações.
   * 
   * @param {Object} req - Objeto de requisição do Express contendo os dados da empresa.
   * @param {Object} res - Objeto de resposta do Express usado para retornar mensagens.
   * 
   * @returns {Object} Resposta JSON indicando sucesso ou falha no registro.
   */
  async registrar(req, res) {
    const { cnpj, razaoSocial, nomeFantasia, emailCorporativo, matricialidade, subordinacao, senha } = req.body;

    try {
      // 🛡️ Verifica se o CNPJ já está cadastrado (somente para matrizes, filiais podem compartilhar o CNPJ)
      const localizarCNPJ = await Empresa.findOne({ where: { cnpj } });
      if (localizarCNPJ) {
        return res.status(400).json({ message: 'Empresa já existe com este CNPJ' });
      }

      // 🔒 Criptografa a senha antes de salvar no banco
      const senhaCriptografada = await Criptografia.gerar(senha);

      // 📝 Cria uma nova empresa no banco de dados
      const empresaCriada = await Empresa.create({
        cnpj,
        razaoSocial,
        nomeFantasia,
        emailCorporativo,
        matricialidade,
        subordinacao,
        senha: senhaCriptografada, // A senha criptografada
      });

      // ✅ Resposta de sucesso
      return res.status(201).json({
        message: 'Empresa criada com sucesso',
        empresaId: empresaCriada.id,
      });

    } catch (error) {
      // ⚠️ Captura e registra erros no processo
      console.error('❌ Erro ao registrar empresa:', error);
      return res.status(500).json({
        message: 'Erro ao registrar',
        falha: error.message,
      });
    }
  }
};
