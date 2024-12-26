/**
 * @file validarCadastroMiddleware.js
 * @description Middleware responsável por validar os dados de cadastro do usuário.
 */

/**
 * @function validarCPF
 * @description Valida se um CPF é válido com base nos dígitos verificadores.
 * @param {string} cpf - O CPF a ser validado.
 * @returns {boolean} - Retorna `true` se o CPF for válido, caso contrário, retorna `false`.
 */
const validarCPF = (cpf) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');

  // Verifica se possui 11 dígitos e não é uma sequência repetida
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

/**
 * @function validarCadastro
 * @description Middleware para validar os dados do corpo da requisição durante o cadastro.
 * @param {Object} req - Objeto de solicitação HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {Function} next - Função para passar o controle para o próximo middleware.
 * @returns {Object|Function} - Retorna um erro de validação ou chama o próximo middleware.
 */
const validarCadastro = (req, res, next) => {
  const { cpf, nomeCompleto, email, senha } = req.body;

  // Validação dos campos obrigatórios
  if (!cpf || !nomeCompleto || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  // Validação do formato do CPF
  if (!/^\d{11}$/.test(cpf)) {
    return res.status(400).json({ mensagem: 'CPF deve conter exatamente 11 números.' });
  }

  // Validação do comprimento da senha
  if (senha.length < 6) {
    return res.status(400).json({ mensagem: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  // Validação do CPF com a lógica específica
  if (!validarCPF(cpf)) {
    return res.status(400).json({ mensagem: 'CPF inválido.' });
  }

  // Prossegue para o próximo middleware ou controlador
  next();
};

module.exports = validarCadastro;
