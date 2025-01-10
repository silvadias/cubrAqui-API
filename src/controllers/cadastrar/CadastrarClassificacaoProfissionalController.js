const ClassificacaoProfissional = require('../../models/classificacaoProfissional/ClassificacaoProfissional');

async function registrar(req, res) {
  try {
    const { nome, idPai, nivel } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !nivel) {
      return res.status(400).json({ erro: "Os campos 'nome' e 'nivel' são obrigatórios." });
    }

    // Validação do ID do pai (se fornecido)
    if (idPai !== null && !(Number.isInteger(idPai) && idPai >= 1)) {
      return res.status(400).json({ erro: 'O campo "idPai" deve ser um número maior que zero ou nulo para itens na raiz da hierarquia.' });
    }

    const paiExistente = idPai ? await ClassificacaoProfissional.findByPk(idPai) : null;

    if (!paiExistente && idPai !== null) {
      return res.status(400).json({ erro: 'O "idPai" fornecido não existe.' });
    }

    // Validação de hierarquia (nível do pai deve ser menor que o nível atual)
    if (paiExistente && paiExistente.nivel >= nivel) {
      return res.status(400).json({ erro: 'O nível do item deve ser maior que o nível do seu "idPai".' });
    }

    // Verificar unicidade de nome globalmente
    const nomeDuplicado = await ClassificacaoProfissional.findOne({
      where: { nome },
    });

    if (nomeDuplicado) {
      return res.status(400).json({ erro: 'Já existe uma classificação com este nome.' });
    }

    // Criar nova classificação
    const novaClassificacao = await ClassificacaoProfissional.create({
      nome,      
      idPai,
      nivel,
    });

    console.log('Nova classificação criada:', novaClassificacao);

    return res.status(201).json({ mensagem: 'Classificação cadastrada com sucesso!', dados: novaClassificacao });
  } catch (erro) {
    console.error('Erro no registro de classificação:', erro);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

module.exports = { registrar };
