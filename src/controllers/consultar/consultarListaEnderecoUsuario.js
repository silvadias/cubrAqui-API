const EnderecoUsuario = require('../../models/EnderecoUsuario');

module.exports = async (req, res)=>{

    try {

        const consultarListaEnderecoUsuariousuarios = await EnderecoUsuario.findAll();

        return res.status(200).json({consultarListaEnderecoUsuariousuarios});

    } catch (error) {
        
        console.log(error);
    }
        
  }

