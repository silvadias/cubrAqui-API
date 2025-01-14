const { Usuario, ClassificacaoProfissional} 
= require('../../models/associations/HabilidadeUsuarioProfissaoAssociation');

// Obter habilidades de um usuário
async function pegarHabilidadeUsuario(req, res) { 

    try {
      const { idUsuario } = req.body;
      
      habilidadeUsuario = await Usuario.findByPk(idUsuario,
        {
          include:{model: ClassificacaoProfissional}
        }       
      )

      res.status(200).json({habilidadeUsuario});  
      
    }catch(error){

      console.log(error);    

    }
  };  
  
  module.exports = {pegarHabilidadeUsuario};