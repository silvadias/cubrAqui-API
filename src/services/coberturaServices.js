const { Op } = require('sequelize'); // Importa operadores do Sequelize
const Cobertura = require('../models/VagaCobertura');
const { Vagas, Empresa, EnderecoEmpresa, ClassificacaoProfissional }= require('../models/associations/vagaEmpresaAssociation');

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

//recebe um array de vagas com a distancias e verifica quais vagas atendem o distanciamento.
async function alcanceVagas(arrayIdVagas,arrayDistancias) {
    const vagas = await Cobertura.findAll({
        where: {
            id: arrayIdVagas, // IDs das vagas
        },
        attributes: ['id', 'kmAlcance'], // Retorna ID e distância fixa (kmAlcance)
    });

    // Filtra as vagas cujas distâncias calculadas atendem ao critério//
    const vagasNaDistancia = vagas.filter((vaga, index) => {
        const distanciaCalculada = arrayDistancias[index];
        return distanciaCalculada <= vaga.kmAlcance;
    });

    // Retorna apenas os IDs das vagas que passaram no critério
    return vagasNaDistancia.map(vaga => vaga.id);
    
}
async function montarHierarquia(classificacao) {
    const ids = [];
    const nomes = [];
    let atual = classificacao;
  
    while (atual) {
      ids.push(atual.id);
      nomes.push(atual.nome);
  
      if (atual.idPai) {
        // Busca o próximo pai
        atual = await ClassificacaoProfissional.findByPk(atual.idPai);
      } else {
        atual = null; // Chegou ao nó raiz
      }
    }
  
    // Retorna as listas de IDs e nomes em ordem da raiz ao nó atual
    return { ids: ids.reverse(), nomes: nomes.reverse() };
  }
  


// Função recebe array com as ids das cobertura elegiveis e retorna os dados para contemplação do usuario


async function retornarCoberturaUsuario(idsVagas) {
    try {
      const vagas = await Vagas.findAll({
        where: { id: idsVagas },
        //attributes:['id','cep'],
        include: [
          {
            model: Empresa,
            attributes:[
                'id',
                'cnpj',
                'nomeFantasia',              
            ],

          
            include: [{ model: EnderecoEmpresa,
                attributes:[
                    'id',
                    'cep',
                    'logradouro',
                    'complemento',
                    'bairro',
                    'localidade',
                    'uf',
                    'numero',
                    'bloco',
                    'apartamento',
                    'setor',
                    'secao',                  
                    
                ],
             }],
          },
          {
            model: ClassificacaoProfissional,
            attributes:['id','idPai'],
            include: [{ model: ClassificacaoProfissional, as: 'pai' }],
          },
        ],
      });
  
      const resultado = {};
  
      for (const vaga of vagas) {
        if (vaga.ClassificacaoProfissional) {
          const { ids, nomes } = await montarHierarquia(vaga.ClassificacaoProfissional);
          vaga.ClassificacaoProfissional.dataValues.hierarquia = {
            ids,
            nomes,
          };
        }
  
        // Usa o ID da vaga como chave no objeto de resultado
        resultado[vaga.id] = vaga;
      }
  
      return resultado;
      
    } catch (error) {
      console.error('Erro ao processar dados:', error);
      throw error;
    }
  }

module.exports = {
    obterVagasCompativeis,
    obterGeolocalizacoesVagas,
    alcanceVagas,
    retornarCoberturaUsuario,
    montarHierarquia
};
