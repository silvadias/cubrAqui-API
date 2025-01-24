const EnderecoUsuario
= require('../models/EnderecoUsuario');

const EspecialidadeUsuario
= require('../models/classificacaoProfissional/HabilidadeProfissionalUsuario');

const {RegistroContratacao}
= require('../models/registroContratacao');

// Retorna a geolocalização do usuário, se existente
async function obterGeolocalizacaoUsuario(idUsuario) { 
    if (!idUsuario) {
        throw new Error('O sistema não conseguiu receber o ID do usuário.');
    }

    const endereco = await EnderecoUsuario.findOne({
        where: { idUsuario },
        attributes: ['latitude', 'longitude'],
    });

    if (!endereco) {
        throw new Error('O usuário não possui endereço cadastrado.');
    }

    if (!endereco.latitude || !endereco.longitude) {
        throw new Error('Usuário com endereço, mas sem latitude e longitude válidos.');
    }

    return [Number(endereco.latitude), Number(endereco.longitude)];
}

// Retorna as habilidades cadastradas do usuário
async function obterHabilidadesUsuario(idUsuario) {
    if (!idUsuario) {
        throw new Error('O sistema não conseguiu receber o ID do usuário.');
    }

    const habilidades = await EspecialidadeUsuario.findAll({
        where: { idUsuario },
        attributes: ['idHabilidade'],
    });

    if (!habilidades || habilidades.length === 0) {
        throw new Error('O usuário não possui habilidades cadastradas.');
    }

    return habilidades.map(h => h.idHabilidade);
}

async function constratosUsuario(idUsuario) {
    try {
        
        const painelUsuario = await RegistroContratacao.findAll(
            {
                where:{idUsuario:idUsuario}
            }
        )

        const contratos = {
            constratosUsuario: painelUsuario.reduce((acc, contrato) => {
                acc[contrato.id] = {
                    dados: JSON.parse(contrato.dados)
                };
                return acc; // Necessário para atualizar o acumulador
            }, {}) // O segundo argumento inicializa o acumulador como um objeto vazio
        };
        
        
        return contratos;

    } catch (error) {
        throw new Error(error.message);
        
    }
    
}



module.exports = {
    obterGeolocalizacaoUsuario,
    obterHabilidadesUsuario,
    constratosUsuario
};
