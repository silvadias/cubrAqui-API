const { coberturasMatch } = require('../../services/usuarioXcoberturaMatchServices');

async function pegarCoberturaEspecialista(req, res) {
  try {
    const { idUsuario } = req.body; // Corrigido
    const matchCobertura = await coberturasMatch(idUsuario); // Adicionado await
    return res.json(matchCobertura); // Retornando a resposta JSON
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message); // Enviando resposta com o erro
  }
}

module.exports = {
  pegarCoberturaEspecialista,
};
