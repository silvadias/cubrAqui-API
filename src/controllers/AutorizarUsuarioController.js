/**
 * @file authController.js
 * @description Controlador responsável pela autenticação de usuários.
 */

const jwt = require('jsonwebtoken');
const Criptografia = require('../middlewares/criptografia');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const Usuario = require('../models/Usuario');

module.exports = {
  /**
   * @function autenticarUsuario
   * @description Realiza a autenticação do usuário com base no CPF e senha fornecidos.
   * @param {Object} req - Objeto de solicitação HTTP.
   * @param {Object} res - Objeto de resposta HTTP.
   * @returns {Object} - Retorna uma mensagem de sucesso com o token JWT ou uma mensagem de erro.
   */
  async autenticarUsuario(req, res) {
    const { cpf, senha } = req.body;

    try {
      // Buscar usuário pelo CPF
      const usuarioEncontrado = await Usuario.findOne({ where: { cpf } });

      if (!usuarioEncontrado) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Validar senha
      const senhaValida = await Criptografia.comparar(senha, usuarioEncontrado.senha);

      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      // Gerar token JWT
      const tokenJWT = jwt.sign(
        { pessoa:'física',
          id: usuarioEncontrado.id, 
          cpf: usuarioEncontrado.cpf },
          JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Retornar resposta bem-sucedida com o token
      return res.status(200).json({
        message: 'Login bem-sucedido',
        token: tokenJWT,        
      });

    } catch (erro) {
      console.error('Erro durante a autenticação:', erro);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};