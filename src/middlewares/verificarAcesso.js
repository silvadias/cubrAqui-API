/**
 * Middleware para verificação do token JWT.
 * 
 * Este middleware verifica se o token JWT enviado no corpo da requisição (em formato JSON) é válido.
 * Se o token for válido, ele decodifica as informações do usuário e as adiciona ao objeto `req.user`,
 * permitindo que a rota ou o próximo middleware tenha acesso a essas informações.
 * Caso o token não esteja presente ou seja inválido, o middleware retorna uma resposta de erro `401 Unauthorized`.
 * 
 * Como usar:
 * Esse middleware deve ser aplicado em rotas que exigem autenticação.
 * Ele vai impedir o acesso a essas rotas caso o token não seja válido ou esteja ausente.
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');  // Chave secreta configurada no ambiente

module.exports = (req, res, next) => {
  // Recupera o token enviado no corpo da requisição (em formato JSON)
  const { token } = req.body;

  // Verifica se o token foi enviado no corpo da requisição
  if (!token) {
    // Retorna erro 401 se o token não estiver presente
    return res.status(401).json({ error: 'Token é obrigatório' });
  }

  try {
    // Tenta verificar e decodificar o token utilizando a chave secreta
    const decoded = jwt.verify(token, JWT_SECRET);

    // Adiciona as informações decodificadas ao objeto req.user
    req.user = decoded;

    // Chama o próximo middleware ou a rota
    next();
  } catch (error) {
    // Retorna erro 401 se o token for inválido ou expirado
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
