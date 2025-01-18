const { coberturasCompativel } 
= require('../../services/usuarioXcoberturaCompativelServices');

async function pegarCoberturaEspecialista(req, res) 
{
  try {

    const { idUsuario } = req.body;
    const matchCobertura = await coberturasCompativel(idUsuario);
    return res.json(matchCobertura);

  } catch (error) {

    console.error(error);
    res.status(500).send(error.message);

  }  
}

module.exports = {
  pegarCoberturaEspecialista,
};
