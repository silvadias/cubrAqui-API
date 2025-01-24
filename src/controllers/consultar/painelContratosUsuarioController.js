//função pega os contratos que o usuario fez a aplicação. 


const {constratosUsuario}=require('../../services/usuarioServices');

async function pegarContratosUsuario(req,res) {
    try {

        const {idUsuario}=req.body
        const contratos = await constratosUsuario(idUsuario);
       
       
        return res.status(200).json(contratos);
        
    } catch (error) {

        throw new Error(error.message);
        
    }
    
}

module.exports={
    pegarContratosUsuario
}