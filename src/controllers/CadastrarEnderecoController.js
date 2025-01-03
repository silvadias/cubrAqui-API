const { Endereco, Empresa, Usuario } = require('../models');

// Função para cadastrar um novo endereço
const CadastrarEnderecoController = async (req, res) => {
  try {
    // Extraindo os dados da requisição
    const { pessoa,cep, numero, complemento, bloco, apartamento, tipoLocal, referencia } = req.body;
    let pessoa_id;
  
    if (pessoa === 'física') {
      id = `F:${id}`;  // Prefixo para usuário
    } else if (pessoa === 'jurídica') {
      id = `J:${id}`;  // Prefixo para empresa
    }

    // Validação simples (adicione validações conforme necessário)
    if (!cep || !numero) {
      return res.status(400).json({ message: "CEP e número são obrigatórios." });
    }

    // Criando o novo endereço
    const novoEndereco = await Endereco.create({
      id,
      
      cep,
      numero,
      complemento,
      bloco,
      apartamento,
      tipoLocal,
      referencia,
    });

    // Respondendo com o endereço criado
    return res.status(201).json({
      message: "Endereço cadastrado com sucesso!",
      endereco: novoEndereco,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao cadastrar o endereço." });
  }
};

module.exports = {
  CadastrarEnderecoController,
};


=====



// Controller para salvar o endereço
async function salvarEndereco(req, res) {
  const { id, tipoPessoa, cep, numero, complemento } = req.body;

  let pessoa_id;
  
  if (tipoPessoa === 'física') {
    pessoa_id = `F:${id}`;  // Prefixo para usuário
  } else if (tipoPessoa === 'jurídica') {
    pessoa_id = `J:${id}`;  // Prefixo para empresa
  }

  try {
    const endereco = await Endereco.create({
      pessoa_id, 
      cep, 
      numero, 
      complemento,
    });

    return res.status(200).json({ message: 'Endereço salvo com sucesso', endereco });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao salvar endereço' });
  }
}
