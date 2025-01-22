const {pegarDadosContratacao}
=require('../../services/empresaServices');


async function contratarUsuario(req, res) {

    try {
        const {idVagaAplicada}  = req.body
        const dadosContratacao  = await pegarDadosContratacao(idVagaAplicada);
        const idCobertura       = dadosContratacao.idCobertura
        const idUsuario         = dadosContratacao.idUsuario
        const idEmpresa         = dadosContratacao.idEmpresa

        return res.status(200).json({idEmpresa});
        

    } catch (error) {

        throw new Error(error.message);
        
    }      

}

module.exports={
    contratarUsuario
}