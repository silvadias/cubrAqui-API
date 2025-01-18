const EnderecoEmpresa 
= require('../models/EnderecoEmpresa');

const Empresa 
= require('../models/Empresa');

// retorna os dados da empresa excluindo dados sencíveis
async function pegarDadosEmpresa(idEmpresa) {

    const dadosEmpresa = await Empresa.findAll({
            where:{id:idEmpresa}        
    });

    return dadosEmpresa;
    
}

async function pegarEnderecoEmpresa(idEmpresa) {

    const enderecoEmpresa = await EnderecoEmpresa.findAll({
            where:{id:idEmpresa}        
    });

    return {endereco: enderecoEmpresa};
    
}

module.exports={
    pegarDadosEmpresa,
    pegarEnderecoEmpresa
}