// Controller retorna para o usuario especialista as coberturas disponíveis para aplicar.

const { coberturasCompativel } 
= require('../../services/coberturaCompativelServices');

const {retornarCoberturaUsuario}
=require('../../services/coberturaServices');
 
const {pegarDadosEmpresa,pegarEnderecoEmpresa} 
= require('../../services/empresaServices');


async function pegarCoberturaEspecialista(req, res) 
{

  try {

    const { idUsuario } = req.body;

    // Recebe as ids da cobertura compatível com o cliente
    const Cobertura = await coberturasCompativel(idUsuario);

    const retornoUsuario = await retornarCoberturaUsuario(Cobertura);

    //const enderecoEmpresa = await pegarDadosEmpresa(retornoUsuario.idEmpresa);

    return res.status(200).json(Cobertura);

  } catch (error) {

    console.error(error);
    res.status(500).send(error.message);

  }  
}

module.exports = {
  pegarCoberturaEspecialista,
};
