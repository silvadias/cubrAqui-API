//observar que o comportamento desta página é a finalização total de aceite
// é um controller que deveria ser ser o aceite do usuario. 
const {
    pegarDadosContratacao,
    pegarNumeroVagasCobertura,
    reduzirUmaVagaCobertura,
    fecharContratoCobertura,
    pegarDadoscobertura,    
    fecharVagaAPlicada
}
=require('../../services/empresaServices');

async function fecharContrato(req, res) {

    try {
        //antes de fechar contrato a vaga deve estar disponível
        //verificar se ja tem aceite do usuario, este procedimento após aceite do mesmo. 
        const {idVagaAplicada}  = req.body
        const dadosContratacao  = await pegarDadosContratacao(idVagaAplicada);
        const idCobertura       = dadosContratacao.idCobertura        
        const numeroVagasCobertura = await pegarNumeroVagasCobertura(idCobertura);
        
        if(numeroVagasCobertura > 1){
            vagas = numeroVagasCobertura - 1
            await reduzirUmaVagaCobertura(idCobertura, vagas);

        }

        if(numeroVagasCobertura == 1){
            await fecharVagaCobertura(idCobertura);

        }

        const dadosCobertura = await pegarDadoscobertura(idCobertura)
        await fecharContratoCobertura(dadosContratacao,dadosCobertura);
        await fecharVagaAPlicada(idVagaAplicada); 
        
        return res.json({message:'Contratação consolidada'});        

    } catch (error) {

        throw new Error(error.message);
        
    }      

}

module.exports={
    fecharContrato
}