const {
  geolocalizacao, 
  habilidades
} = require('../../services/usuarioServices');

const {vagasCompativeis,
  geoCoberturas
}=require('../../services/coberturaServices');

const {kmDistancia}=require('../../middlewares/calcularRaioDistanciaLatitudeLongitude');



async function pegarCoberturaEspecialista (req,res){  

  try {
    const idUsuario = req.body.idUsuario;
    
    const habilidadesUsuario = await habilidades(idUsuario); //ok
   
    const match = await vagasCompativeis(habilidadesUsuario);//ok
    
    const geoVaga = await geoCoberturas(match); //ok   
    

    const enderecoUsuario = await geolocalizacao(idUsuario); //0k    
    
    //console.log('retorno do console lat lon usuario, ',enderecoUsuario);
    const kms = await kmDistancia(enderecoUsuario,geoVaga); //ok
    let teste;
    (Array.isArray(kms))?teste = "o teste esta recebendo um array": teste = "O teste não é um array";

    res.status(200).send(`${teste}`);







    //return res.send(kms);
    //usuario=>geolocalizado, id Habilidades,
    //


    
  } catch (error) {
    console.log(error);   
  }
};

module.exports = {pegarCoberturaEspecialista}; 



/* 



const EspecialidadeUsuario = require('../../models/classificacaoProfissional/HabilidadeProfissionalUsuario');
const VagaCobertura = require('../../models/VagaCobertura');
const CalcularRaioDistanciaVaga = require('../../middlewares/calcularRaioDistanciaLatitudeLongitude');
const EnderecoUsuario = require('../../models/EnderecoUsuario');

async function pegarCoberturaEspecialista(req, res) {
  try {
    const { idUsuario } = req.body;

    /////////////////////////////////////MATCH

    // Consulta vagas compatíveis
    const vagaComHabilidadeUsuario = await VagaCobertura.findAll({
      where: { especialista: idHabilidadesArray },
    });

    if (vagaComHabilidadeUsuario.length === 0) {
      return res.status(200).json({ message: 'Nenhuma habilidade é compatível com a especialidade do usuário.' });
    }

    idVagas = vagaComHabilidadeUsuario.map(e => Number(e.id));
    latitudeVagas = vagaComHabilidadeUsuario.map(e => Number(e.latitude));
    longitudeVagas = vagaComHabilidadeUsuario.map(e => Number(e.longitude));

   
    // Calcula distância
    raioDistanciaVagas = await CalcularRaioDistanciaVaga(latitudeUsuario, longitudeUsuario, latitudeVagas, longitudeVagas);

    if (!raioDistanciaVagas || raioDistanciaVagas.length === 0) {
      console.log(`O cálculo de raio de distância da vaga não retornou nada.`);
    }

    console.log(`O id da habilidade do usuário em array é: ${idHabilidadesArray}`);
    console.log(`A latitude do endereço do usuário é ${latitudeUsuario} e a longitude é: ${longitudeUsuario}`);
    latitudeVagas.forEach((lat, index) => {
      console.log(`Vaga ${index + 1}: Latitude = ${lat}, Longitude = ${longitudeVagas[index]}`);
    });
    console.log(`O km de distância entre o usuário e as vagas é: ${raioDistanciaVagas}`);
    
    return res.status(200).json({ raioDistanciaVagas });

  } catch (error) {
    console.error(`Erro ao obter as habilidades do usuário: ${error.message}`, error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}


      

        // consulta vagas de coberturas lançada pelas empresas compatíveis com as habilidades cadastrada do usuário.
        vagaComHabilidadeUsuario = await VagaCobertura.findAll({
          where:{
            especialista:idHabilidadesArray,
          }          
        });

        if(!vagaComHabilidadeUsuario){
          idVagas = 'retorno de vabas 0'
          return res.status(200).json({message: 'Nenhuma habilidade é compatível com a especialidade do usuário.'});
        } 
        idVagas = vagaComHabilidadeUsuario.map(e=>Number(e.id));
        latitudeVagas = vagaComHabilidadeUsuario.map(e=>Number(e.latitude));
        longitudeVagas = vagaComHabilidadeUsuario.map(e=>Number(e.longitude));
        */