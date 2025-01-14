const { HabilidadeProfissionalUsuario, Usuario, ClassificacaoProfissional} = require('../../models/associations/HabilidadeUsuarioProfissaoAssociation');
 
// Registro de habilidade para o usuário
async function registrar(req, res) {
  try {

    const { idUsuario, idHabilidade } = req.body;

     registrar = await HabilidadeProfissionalUsuario.create({
      idUsuario:idUsuario,
      idHabilidade:idHabilidade,
    })

    if(registrar){
      return res.status(200).json({message:'Habilidade do usuário registrado com sucesso!'});
    }
    
  }catch(error){

    console.log(error);

  };
};

module.exports = { registrar };
