const {
  obterGeolocalizacaoUsuario,
  obterHabilidadesUsuario,
} = require('../../services/usuarioServices');

const {
  obterVagasCompativeis,
  obterGeolocalizacoesVagas,
} = require('../../services/coberturaServices');

const { calcularDistancias } = require('../../middlewares/calcularRaioDistanciaLatitudeLongitude');

async function pegarCoberturaEspecialista(req, res) {
  try {
      const idUsuario = req.body.idUsuario;

      const habilidadesUsuario = await obterHabilidadesUsuario(idUsuario);
      const vagas = await obterVagasCompativeis(habilidadesUsuario);
      const geoVagas = await obterGeolocalizacoesVagas(vagas);
      const enderecoUsuario = await obterGeolocalizacaoUsuario(idUsuario);
      const distancias = calcularDistancias(enderecoUsuario, geoVagas);
      

      res.json(distancias);
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
}

module.exports = { pegarCoberturaEspecialista };
