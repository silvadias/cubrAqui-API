const {aceitaUsuarioCobrir}=require('../../services/empresaServices')
async function aceitarUsuarioCobertura(req,res) {
    
    const {idCobertura}=req.body
    const aceite = await aceitaUsuarioCobrir(idCobertura);
    return res.json(aceite);        

}

module.exports={
    aceitarUsuarioCobertura
}