/**
 * @file autorizarEmpresaController.js
 * @description Controlador responsável pela autenticação de empresas.
 */

const jwt = require('jsonwebtoken');
const Criptografia = require('../middlewares/criptografia');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const Empresa = require('../models/Empresa');

module.exports = {
  /**
   * @function autenticarEmpresa
   * @description Realiza a autenticação da empresa com base no email corporativo e senha fornecidos.
   * @param {Object} req - Objeto de solicitação HTTP.
   * @param {Object} res - Objeto de resposta HTTP.
   * @returns {Object} - Retorna uma mensagem de sucesso com o token JWT ou uma mensagem de erro.
   */
  async autenticarEmpresa(req, res) {
    try {
      const { emailCorporativo, senha } = req.body; // Extraindo dados do corpo da requisição

      // 🛡️ Validação dos campos obrigatórios
      if (!emailCorporativo || !senha) {
        return res.status(400).json({ message: 'Email corporativo e senha são obrigatórios.' });
      }

      // 🔍 Buscar empresa pelo email corporativo
      const empresaEncontrado = await Empresa.findOne({ where: { emailCorporativo } });

      if (!empresaEncontrado) {
        return res.status(404).json({ message: 'Empresa não encontrada.' });
      }

      // 🔑 Validar senha
      const senhaValida = await Criptografia.comparar(senha, empresaEncontrado.senha);

      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }

      // 🛡️ Gerar token JWT
      const tokenJWT = jwt.sign(
        { 
          pessoa: 'jurídica',
          id: empresaEncontrado.id,
          cnpj: empresaEncontrado.cnpj 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // ✅ Retornar resposta bem-sucedida com o token
      return res.status(200).json({
        message: 'Login bem-sucedido.',
        token: tokenJWT,
      });

    } catch (erro) {
      console.error('Erro durante a autenticação:', erro);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
};
