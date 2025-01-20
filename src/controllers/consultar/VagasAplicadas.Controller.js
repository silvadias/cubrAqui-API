const {
  Usuario,
  Empresa,
  VagaAplicada,
  VagaCobertura,
} = require('../../models/associations/vagaAplicadaAssociation');

const { pegarVagasAplicadas } = require('../../services/empresaServices');

// Endpoint para obter as vagas aplicadas
async function vagasAplicadas(req, res) {
  try {
      const { idEmpresa } = req.body; // Obtém o ID da empresa do corpo da requisição

      // Obtém as vagas aplicadas usando o serviço
      const painelVagas = await pegarVagasAplicadas(idEmpresa);

      // Resposta com os dados estruturados
      res.status(200).json({ painelVagas });
  } catch (error) {
      console.error('Não foi possível obter o painel de cobertura:', error);
      res.status(500).json({ error: 'Erro ao obter vagas aplicadas' });
  }
}

module.exports = {
  vagasAplicadas,
  pegarVagasAplicadas,
  Usuario,
  Empresa,
  VagaAplicada,
  VagaCobertura,
};
