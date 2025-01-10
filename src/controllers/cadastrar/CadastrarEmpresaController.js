const Criptografia = require('../../middlewares/criptografia');
const Empresa = require('../../models/Empresa');

// 🚀 Controller para criar uma empresa
async function registrar(req, res) {
  const { cnpj, razaoSocial, nomeFantasia, emailCorporativo, matricialidade, subordinacao, senha } = req.body;

  try {
    const senhaCriptografada = await Criptografia.gerar(senha);

    const empresaCriada = await Empresa.create({
      cnpj,
      razaoSocial,
      nomeFantasia,
      emailCorporativo,
      matricialidade,
      subordinacao,
      senha: senhaCriptografada,
    });

    return res.status(201).json({
      message: 'Empresa criada com sucesso',
      empresaId: empresaCriada.id,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao registrar empresa',
      falha: error.message,
    });
  }
}

module.exports = { registrar };
