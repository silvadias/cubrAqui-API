const {
    obterGeolocalizacaoUsuario,
    obterHabilidadesUsuario,
  } = require('./usuarioServices');
  
  const {
    obterVagasCompativeis,
    obterGeolocalizacoesVagas,
    alcanceVagas,
  } = require('./coberturaServices');
  
  const { calcularDistancias } 
  = require('../middlewares/calcularRaioDistanciaLatitudeLongitude');
  
  async function coberturasMatch(idUsuario) {
    try {

        const habilidadesUsuario  = await obterHabilidadesUsuario     (idUsuario);
        const enderecoUsuario     = await obterGeolocalizacaoUsuario  (idUsuario);
        const vagas               = await obterVagasCompativeis       (habilidadesUsuario);      
        const geoVagas            = await obterGeolocalizacoesVagas   (vagas);      
        const distancias          = calcularDistancias                (enderecoUsuario, geoVagas);
        const vagasPermitidas     = await alcanceVagas                (vagas,distancias);      
  
        return vagasPermitidas;
  
    } catch (error) {
        console.error(error);
        throw new Error (error);
    }
  }
  
  module.exports = { coberturasMatch };