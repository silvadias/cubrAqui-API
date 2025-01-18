const EnderecoUsuario = require('../../models/EnderecoUsuario');

module.exports = async (req, res)=>{

    try {

        const ListaEnderecoUsuariousuarios = await EnderecoUsuario.findAll();

        return res.status(200).json({ListaEnderecoUsuariousuarios});

    } catch (error) {
        
        console.log(error);
    }
        
  }

