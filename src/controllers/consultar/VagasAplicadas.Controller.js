const { 
    Usuario, 
    Empresa,
    VagaAplicada,
    VagaCobertura
} 
= require('../../models/associations/vagaAplicadaAssociation');

// Obter habilidades de um usuário
async function vagasAplicadas(req, res) 
{
    try {
      

      res.status(200).json({message: 'controller de cobertura ativo'});  
      
    }catch(error){

      console.log('Nao foi possível obter o painel de cobertura :'.error);    

    }
    
  };  
  
  module.exports = {
    vagasAplicadas,
    Usuario, 
    Empresa,
    VagaAplicada,
    VagaCobertura
};