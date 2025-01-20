
const EnderecoEmpresa 
= require('../models/EnderecoEmpresa');

const { 
    Usuario, 
    Empresa,
    VagaAplicada,
    VagaCobertura
} 
= require('../models/associations/vagaAplicadaAssociation');


// retorna os dados da empresa excluindo dados sencíveis
async function pegarDadosEmpresa(idEmpresa) {

    const dadosEmpresa = await Empresa.findAll({
            where:{id:idEmpresa}        
    });

    return dadosEmpresa;
    
}

async function pegarEnderecoEmpresa(idEmpresa) {

    const enderecoEmpresa = await EnderecoEmpresa.findAll({
            where:{id:idEmpresa},        
    });

    return {endereco: enderecoEmpresa};
    
}

async function pegarVagasAplicadas(idEmpresa) {
    try {
        const painelVagas = await VagaAplicada.findAll({
            where: { idEmpresa: idEmpresa },
            include: [
                {
                    model: VagaCobertura,
                    as: 'vaga', // Alias definido na associação
                    attributes:{exclude:[
                        'idEmpresa',
                        'uf',
                        'ibge',
                        'gia',
                        'ddd',
                        'siafi',
                        'latitude',
                        'logitude',
                        'createdAt',
                        'updatedAt',
                    ]},
                   
                },
                {
                    model: Usuario,
                    as: 'usuario', // Alias definido na associação
                    attributes:{exclude:[
                        'senha',
                        'createdAt',
                        'updatedAt',                    ]},
                    //attributes: ['id', 'nome', 'email'], // Campos desejados do usuário
                },
                {
                    model: Empresa,
                    as: 'empresa', // Alias definido na associação
                    attributes: [
                        'id',
                        'nomeFantasia',
                    'emailCorporativo',
                    'matricialidade'
                ], // Campos desejados da empresa
                },
            ],
            //attributes: [], // Inclui os campos da tabela principal
        });

        return painelVagas;
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports={
    pegarDadosEmpresa,
    pegarEnderecoEmpresa,
    pegarVagasAplicadas
};