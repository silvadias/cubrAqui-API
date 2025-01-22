const {pegarDadosContratacao}
=require('../../services/empresaServices');


async function contratarUsuario(req, res) {

    try {
        const {idVagaAplicada} = req.body
        const dadosContratacao = await pegarDadosContratacao(idVagaAplicada)


        return res.status(200).json({dadosContratacao});

    } catch (error) {

        throw new Error(error.message);
        
    }      

}

module.exports={
    contratarUsuario
}