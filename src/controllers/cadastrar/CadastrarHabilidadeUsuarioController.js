const { HabilidadeProfissionalUsuario, Usuario, ClassificacaoProfissional} = require('../../models/associations/HabilidadeUsuarioProfissaoAssociation');
 
// Registro de habilidade para o usuário
async function registrar(req, res) {
  try {
    const { idUsuario, idHabilidade } = req.body;


     gravado = await HabilidadeProfissionalUsuario.create({
      idUsuario:idUsuario,
      idHabilidade:idHabilidade,
    })
    
    
  }catch(error){
    console.log(error);
  };
};
// Obter habilidades de um usuário
async function getHabilidadeUsuario(req, res) { 

  try {
    const { idUsuario } = req.body;
    
    habilidadeUsuario = await Usuario.findByPk(idUsuario,
      {
        include:{model: ClassificacaoProfissional}
      }
      
    )
    
    res.status(200).json({habilidadeUsuario});
    console.log(teste);
    

/* 
    resultado = await Usuario.findByPk(idUsuario,
      {
      include: {model: ClassificacaoProfissional},
    });

    return res.status(200).json({message:resultado}); */
    
    
  }catch(error){
    console.log(error);
  
  }
};


module.exports = { registrar, getHabilidadeUsuario };
