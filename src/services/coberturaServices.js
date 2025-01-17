const Cobertura = require('../models/VagaCobertura');


/*
* Função recebe um array numérico para consultar as habilidades solicitadas no lançamento 
* das vagas de cobertura das empresas.
* Retorna um array com as Ids das vagas que foram compatíveis com o array que
* representa um conjunto de habilidades exercida pelo requerente.
*/

async function vagasCompativeis(habilidadesUsuario) {
    
    if (!Array.isArray(habilidadesUsuario)){
        throw new Error("O parametro recebido na função VagasCompatíveis da servo coberturaServices.js não é um array válido.")
    
    }

    if (!habilidadesUsuario || habilidadesUsuario.length === 0) {
        throw new Error('coberturaServices.js : O parametro recebido é um array mas esta vazio');

    }

    // Consulta na tabela Cobertura as vagas compatíveis com as habilidades do usuário
    const coberturas = await Cobertura.findAll({
         where: {
            especialista: habilidadesUsuario// Aqui deve estar compatível com sua modelagem
            
        },
        attributes: ['id'], // Retorna apenas os IDs das vagas 
    });

    // Verifica se foram encontradas coberturas
    if (!coberturas || coberturas.length === 0) {
        return [];
    }

    // Extrai os IDs das vagas em um array simples
    const idsVagas = Array.from(coberturas.map(cobertura => cobertura.id));

    // Retorna os IDs das vagas
    return idsVagas;
}


/*
* Função recebe array dos ids de vagas de coberturas e retorna latitude longitude das vagas
* @ paramns : Id Vagas Abertas
*/

async function geoCoberturas(idVagas) {

    if (!Array.isArray(idVagas)){
        throw new Error("O parametro recebido na função geVagas em coberturaServices não é um array válido.")
    
    }

    if (!idVagas || idVagas.length === 0) {
        throw new Error('coberturaServices.js : O parametro recebido é um array mas esta vazio');

    }

    const latitudeLongitude = await Cobertura.findAll({
        where: {
           id: idVagas// Aqui deve estar compatível com sua modelagem
           
       },
       attributes: ['latitude','longitude'], // Retorna apenas os IDs das vagas 

    });

    const coordenadas = Array.from(latitudeLongitude.map(item => [
        Number(item.latitude),
        Number(item.longitude)
    ]));

    return coordenadas;

}













module.exports={
    vagasCompativeis,
    geoCoberturas
}