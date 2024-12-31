const Empresa = require('../models/Empresa'); // Caminho correto para o modelo Empresa

// ✅ Função para validar CNPJ
function validarCNPJ(cnpj) {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, '');
  
  // Verifica se possui 14 dígitos
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  // Validação do primeiro dígito verificador
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  // Validação do segundo dígito verificador
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

// ✅ Middleware para validar empresa
async function verificarEmpresa(req, res, next) {
  const { cnpj, matricialidade, emailCorporativo } = req.body;

  // 🚨 1. Validação do CNPJ
  if (!cnpj) {
    return res.status(400).json({ error: 'CNPJ é obrigatório.' });
  }
  if (!validarCNPJ(cnpj)) {
    return res.status(400).json({ error: 'CNPJ inválido. Certifique-se de que ele está correto.' });
  }

  // 🚨 2. Validação da Matricialidade
  if (!matricialidade || (matricialidade !== 'matriz' && matricialidade !== 'filial')) {
    return res.status(400).json({ error: 'O campo Matricialidade aceita apenas os valores "Matriz" ou "Filial"'});
  }

  // 🚨 3. Validação do Email Corporativo
  if (!emailCorporativo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCorporativo)) {
    return res.status(400).json({ error: 'Email inválido. Informe um email no formato correto.' });
  }

  try {
    // 🔄 4. Verifica duplicidade de Email
    const emailExistente = await Empresa.findOne({ where: { emailCorporativo } });
    if (emailExistente) {
      return res.status(400).json({ error: 'Este email já está em uso. Cada matriz e filial deve ter um email exclusivo.' });
    }

    // 🔄 5. Verificação de CNPJ
    const empresaExistente = await Empresa.findOne({ where: { cnpj } });

    // Se a empresa já existir
    if (empresaExistente) {
      // Se for matriz e já existir uma matriz com esse CNPJ
      if (matricialidade === 'matriz' && empresaExistente.matricialidade === 'matriz') {
        return res.status(400).json({ error: 'Já existe uma matriz cadastrada com este CNPJ.' });
      }

      // Se for filial, deve permitir duplicidade de CNPJ (uma filial com o mesmo CNPJ de uma matriz)
      if (matricialidade === 'filial') {
        return next(); // Permite a criação da filial com o mesmo CNPJ da matriz
      }
    }

    // Se for uma nova matriz e não houver duplicidade
    if (!empresaExistente || matricialidade === 'matriz') {
      return next();
    }

    return res.status(400).json({ error: 'Erro na validação do CNPJ. Verifique os dados fornecidos.' });
  } catch (error) {
    console.error('❌ Erro ao validar dados da empresa:', error);
    return res.status(500).json({ error: 'Erro interno do servidor. Tente novamente mais tarde.' });
  }
}

module.exports = verificarEmpresa;
