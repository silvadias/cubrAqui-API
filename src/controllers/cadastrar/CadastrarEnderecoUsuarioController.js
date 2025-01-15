const EnderecoUsuario = require('../../models/EnderecoUsuario');

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
            secao,
            tipo_local,
            referencia,
            latitude,
            longitude,            
        } = req.body

        if (!cep || !numero) {
            return res.status(400).json({ message: "CEP e número são obrigatórios." });
          }
          const idCadastrado = await EnderecoUsuario.findAll({
            where: {idUsuario : id}
          });
      
          if (idCadastrado.length > 0) {
            return res.status(409).json({ message: "Só é possível registar um endereço por usuário!"});
          }

        const EnderecoUsuarioRegistrado = await EnderecoUsuario.create({
            idUsuario: id,            
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
          });
      
          return res.status(201).json({
            message: 'Registro de endereço do usuário criado com sucesso!',
            EnderecoUsuario: EnderecoUsuarioRegistrado});

        
    } catch (error) {

         // ⚠️ Captura e registra erros no processo
      console.error('❌ Erro ao registrar endereço do usuário:', error);
      return res.status(500).json({
        message: 'Erro ao registrar',
        falha: error.message,});        
    }

}

module.exports = { registrar };