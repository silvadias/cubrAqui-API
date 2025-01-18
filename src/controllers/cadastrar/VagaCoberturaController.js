const VagaCobertura = require('../../models/VagaCobertura');

async function registrar(req, res){

    try {
        const id = req.tokenDecodificado.id;
        
        const {          
            vagas,
            valor,
            especialista,
            expandirEspecificidade,
            comprovacaoTecnica,
            dataInicio,
            horaInicio,
            dataFim,
            horaFim,            
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
            estado,
            regiao,
            ibge,
            gia,
            ddd,
            siafi,
            numero,
            bloco,
            apartamento,
            setor,
            secao,
            tipo_local,
            referencia,
            latitude,
            longitude,
            observacao,
        } = req.body

        const VagaCoberturaAberta = await VagaCobertura.create({
            idEmpresa: id,
            vagas,
            valor,
            especialista,
            expandirEspecificidade,
            comprovacaoTecnica,
            dataInicio,
            horaInicio,
            dataFim,
            horaFim,            
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
            estado,
            regiao,
            ibge,
            gia,
            ddd,
            siafi,
            numero,
            bloco,
            apartamento,
            setor,
            secao,
            tipo_local,
            referencia,
            latitude,
            longitude,
            observacao,

          });
      
          return res.status(201).json({
            message: 'Vaga de Cobertura criada com sucesso',
            vaga: VagaCoberturaAberta});

        
    } catch (error) {

         // ⚠️ Captura e registra erros no processo
      console.error('❌ Erro ao registrar usuário:', error);
      return res.status(500).json({
        message: 'Erro ao registrar',
        falha: error.message,});        
    }

}

module.exports = { registrar };