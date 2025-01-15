const EspecialidadeUsuario
= require('../../models/classificacaoProfissional/HabilidadeProfissionalUsuario');
const VagaCobertura
=require('../../models/VagaCobertura');

// Obtem a habilidades do usuário logado que fez a requisição.
async function pegarCoberturaEspecialista(req, res) { 

    try {
      //recebe dados da requisição, porém fica o débito de retirar diretamente do token o id do usuario
      const { idUsuario } = req.body;

      //busca as habilidades que o usuário cadastrou e retorna as habilidades
      habilidadeEspecialistaUsuario = await EspecialidadeUsuario.findAll(        
        {
          where: {idUsuario:idUsuario},
          attributes:['idHabilidade'],          
        });
        // converte o resultado das busca da habilidade em array
        const idHabilidadesArray = habilidadeEspecialistaUsuario.map(e => e.idHabilidade);      

        // extrai vagas de coberturas lançada pelas empresas compatíveis com todas as habilidade especialista cadastrada do usuario.
        vagaComHabilidadeUsuario = await VagaCobertura.findAll({
          where:{
            especialista:idHabilidadesArray,

          }
        });




       








        return res.status(200).send(vagaComHabilidadeUsuario);

      
    }catch(error){

      console.log('Nao foi possível obter as habilidades usuario :'.error);    

    }
  };  
  
  module.exports = {pegarCoberturaEspecialista};