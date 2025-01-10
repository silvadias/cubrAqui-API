const EnderecoEmpresa = require('../../models/EnderecoEmpresa');

async function registrar(req, res){

    try {
        const id = req.tokenDecodificado.id;
        
        const {               
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
            tipo_local,
            referencia,
            latitude,
            longitude,            
        } = req.body

        if (!cep || !numero) {
            return res.status(400).json({ message: "CEP e número são obrigatórios." });
          }
          const idCadastrado = await EnderecoEmpresa.findAll({
            where: {idEmpresa : id}
          });
      
          if (idCadastrado.length > 0) {
            return res.status(409).json({ message: 
                "Só é possível registar um endereço por matriz ou filial. Apénas é possível registrar setores."});
          }

        const EnderecoEmpresaRegistrado = await EnderecoEmpresa.create({
            idEmpresa: id,            
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
            tipo_local,
            referencia,
            latitude,
            longitude,
          });
      
          return res.status(201).json({
            message: 'Registro de endereço da empresa criado com sucesso!',
            EnderecoEmpresa: EnderecoEmpresaRegistrado});

        
    } catch (error) {

         // ⚠️ Captura e registra erros no processo
      console.error('❌ Erro ao registrar endereço da empresa:', error);
      return res.status(500).json({
        message: 'Erro ao registrar',
        falha: error.message,});        
    }

}

module.exports = { registrar };