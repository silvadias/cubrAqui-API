const EnderecoUsuario = require('../models/EnderecoUsuario');
const EspecialidadeUsuario = require('../models/classificacaoProfissional/HabilidadeProfissionalUsuario');


// Serviço que retorna a geolocalização do usuário, se existente
async function  geolocalizacao(idUsuario) { 
    
      if(!idUsuario || idUsuario === null || idUsuario=="" || idUsuario == 0){
        throw new Error('O sistema não conseguiu receber o usuário');

      }
      
        // Consulta a latitude e longitude baseando-se na chave estrangeira `idUsuario`
        const endereco = await EnderecoUsuario.findOne({
            where: { idUsuario: idUsuario }, // Busca pela chave estrangeira
            attributes: ['latitude', 'longitude'], // Seleciona apenas os campos necessários

        });
        
        // Verifica se o endereço foi encontrado
        if (!endereco) {
            throw new Error('O usuário não tem endereço cadastrado.');                     
            
        }        

        // Verifica se o endereço contém latitude e longitude válidos
        if (!endereco.latitude || !endereco.longitude) {
            throw new Error('Usuário com endereço, mas sem latitude e longitude válidos.');

        }

        const coordenadas = Array.from([endereco.latitude,endereco.longitude]);

        // Retorna a geolocalização como objeto        
        return coordenadas;
    } 


//////////////////////////////////////////////////////////////////////////////////
/*
*Função retorna todas as habilidades cadastrada do usuário.

@ params : idUsuario -> Recebe do token o id do usuario logado.
@ return : Retorna a id das habilidades cadastradas. 
*
/*///////////////////////////////////////////////////////////////////////////////

async function habilidades(idUsuario){

  if(!idUsuario || idUsuario === null || idUsuario=="" || idUsuario == 0){
    throw new Error('O sistema não conseguiu receber o usuário');

  }

  // Retorna ids habilidades cadastradas pelo usuário
  const habilidades = await EspecialidadeUsuario.findAll({
    where: { idUsuario: idUsuario },
    attributes: ['idHabilidade'],
  });

  if (habilidades.length === 0 || !habilidades ) {
    throw new Error("O usuário não tem habilidades cadastradas");
  }

  const habilidadesIds = Array.from(habilidades.map(h => h.idHabilidade));

  return habilidadesIds;


  
};

module.exports={
  geolocalizacao,  
  habilidades
  }