const {
    pegarDadosContratacao,
    pegarNumeroVagasCobertura,
    reduzirUmaVagaCobertura,
    fecharVagaCobertura

}
=require('../../services/empresaServices');


async function contratarUsuario(req, res) {

    try {
        const {idVagaAplicada}  = req.body
        const dadosContratacao  = await pegarDadosContratacao(idVagaAplicada);
        const idCobertura       = dadosContratacao.idCobertura
        const idUsuario         = dadosContratacao.idUsuario
        const idEmpresa         = dadosContratacao.idEmpresa
        const numeroVagasCobertura = await pegarNumeroVagasCobertura(idCobertura);
        
        if(numeroVagasCobertura > 1){
            vagas = numeroVagasCobertura - 1
            await reduzirUmaVagaCobertura(idCobertura, vagas);
        }
        if(numeroVagasCobertura == 1){
            await fecharVagaCobertura(idCobertura)

        }




        /* passos:
        verificar quantas vagas existe no idCobertura,
        se a vaga for igual a um, o controller deve alterar para fechada no bando de dados. 
        deve registrar num bando de dados as informações da contratação, com data e hora de aceita da empresa. 
        deve ficar disponível para o o usuario que a vaga que ele aplicou foi aceita.
        começa a produção do aplicativo react. */

        
        return res.json({numeroVagasCobertura});
        

    } catch (error) {

        throw new Error(error.message);
        
    }      

}

module.exports={
    contratarUsuario
}