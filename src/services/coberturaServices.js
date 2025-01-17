const Cobertura = require('../models/VagaCobertura');

// Retorna IDs de vagas compatíveis com as habilidades do usuário
async function obterVagasCompativeis(habilidadesUsuario) {
    if (!Array.isArray(habilidadesUsuario) || habilidadesUsuario.length === 0) {
        throw new Error('O parâmetro habilidadesUsuario deve ser um array não vazio.');
    }

    const coberturas = await Cobertura.findAll({
        where: { especialista: habilidadesUsuario },
        attributes: ['id'],
    });

    if (!coberturas || coberturas.length === 0) {
        return [];
    }

    return coberturas.map(c => c.id);
}

// Retorna as coordenadas das vagas
async function obterGeolocalizacoesVagas(idVagas) {
    if (!Array.isArray(idVagas) || idVagas.length === 0) {
        throw new Error('O parâmetro idVagas deve ser um array não vazio.');
    }

    const latitudeLongitude = await Cobertura.findAll({
        where: { id: idVagas },
        attributes: ['latitude', 'longitude'],
    });

    return latitudeLongitude.map(item => [Number(item.latitude), Number(item.longitude)]);
}

module.exports = {
    obterVagasCompativeis,
    obterGeolocalizacoesVagas,
};
