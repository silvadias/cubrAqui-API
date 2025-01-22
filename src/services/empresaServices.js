
const EnderecoEmpresa 
= require('../models/EnderecoEmpresa');

const { 
    Usuario, 
    Empresa,
    VagaAplicada,
    VagaCobertura
} 
= require('../models/associations/vagaAplicadaAssociation');

const {RegistroContratacao} 
= require('../models/registroContratacao');


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

        
        let painel = {};
        let contador=0;

        for(usuarios of painelVagas){              
            painel[painelVagas[contador].id]=usuarios;                 
            contador++
        }
        
        // Retorna o valor de map após todas as iterações
        return painel;

    } catch (error) {
        throw new Error(error.message);
    }

}


async function pegarDadosContratacao(idVagaAplicada){
    try {
        
        const dados = await VagaAplicada.findByPk(idVagaAplicada);
        return dados; 

    } catch (error) {
        throw new Error(error.message);

    }    
   
}

async function pegarNumeroVagasCobertura(idVagaCobertura){
    try {
        
        const dados = await VagaCobertura.findByPk(idVagaCobertura);
        return dados.vagas

    } catch (error) {
        throw new Error(error.message);

    }    
   
}


async function reduzirUmaVagaCobertura(idVagaCobertura, vagas){
    try {
        
        await VagaCobertura.update(
            {
            vagas: vagas,
            },
        {             
          where:{id:idVagaCobertura}
        });        
        
        
          return {message: 'numero de vagas reduzido'};

    } catch (error) {
        throw new Error(error.message);

    }    
   
}

async function fecharVagaCobertura(idVagaCobertura){

    try {
        await VagaCobertura.update(
            {
            vagas: 0,
            status: 'fechada',
            },
        {             
        where:{id:idVagaCobertura}
        });        
        
    
        return {message: 'Cobertura Finalizada com sucesso!'};

    } catch (error) {

        throw new Error(error.message);

    }    
   
}


async function fecharContratoCobertura(registroBasico,registrosGeral){

    try {
        
        registroBasico.id
        registroBasico.idCobertura
        registroBasico.idUsuario
        registroBasico.idEmpresa


        await RegistroContratacao.create(
            {
                idVagaAplicada:registroBasico.id,
                idCobertura:registroBasico.idCobertura,
                idUsuario:registroBasico.idUsuario,
                idEmpresa:registroBasico.idEmpresa,
                dados:registrosGeral
            }
        );
       
        
    
        return {message: 'Cobertura Finalizada com sucesso!'};

    } catch (error) {

        throw new Error(error.message);

    }    
   
}

async function pegarDadoscobertura(idCobertura) {
    const relacao = await VagaCobertura.findByPk(idCobertura);
    return relacao;
    
}


async function fecharVagaAPlicada(idVagaAplicada){
   
   try {

        await VagaAplicada.destroy(
            {
                where:{id:idVagaAplicada}
            }
        );

   } catch (error) {

    throw new Error(error.message);
    
   }
}





module.exports={
    pegarDadosEmpresa,
    pegarEnderecoEmpresa,
    pegarVagasAplicadas,
    pegarDadosContratacao,
    pegarNumeroVagasCobertura,
    reduzirUmaVagaCobertura,
    fecharVagaCobertura,
    fecharContratoCobertura,
    pegarDadoscobertura,
    fecharVagaAPlicada
};