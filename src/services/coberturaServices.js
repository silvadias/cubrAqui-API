const { Op } = require('sequelize'); // Importa operadores do Sequelize
const Cobertura = require('../models/VagaCobertura');


// Retorna IDs de vagas compatíveis com as habilidades do usuário
async function obterVagasCompativeis(habilidadesUsuario) {
    if (!Array.isArray(habilidadesUsuario) || habilidadesUsuario.length === 0) {
        throw new Error('O parâmetro habilidadesUsuario deve ser um array não vazio.');
    }

    const coberturas = await Cobertura.findAll({
        where: {
            especialista: habilidadesUsuario,
            status : 'aberta',              
         },
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

async function alcanceVagas(arrayIdVagas,arrayDistancias) {
    const vagas = await Cobertura.findAll({
        where: {
            id: arrayIdVagas, // IDs das vagas
        },
        attributes: ['id', 'kmAlcance'], // Retorna ID e distância fixa (kmAlcance)
    });

    // Filtra as vagas cujas distâncias calculadas atendem ao critério
    const vagasNaDistancia = vagas.filter((vaga, index) => {
        const distanciaCalculada = arrayDistancias[index];
        return distanciaCalculada <= vaga.kmAlcance;
    });

    // Retorna apenas os IDs das vagas que passaram no critério
    return vagasNaDistancia.map(vaga => vaga.id);
    
}


module.exports = {
    obterVagasCompativeis,
    obterGeolocalizacoesVagas,
    alcanceVagas
};
