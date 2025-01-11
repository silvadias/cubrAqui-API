const ClassificacaoProfissional = require('../../models/classificacaoProfissional/ClassificacaoProfissional');
const { fn, col } = require('sequelize');

async function registrar(req, res) {
  try {
    const { nome, idPai } = req.body;
    let { nivel } = req.body; // Permitir reatribuição

    // Validação de campos obrigatórios
    if (!nome) {
      return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
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
   /*  if (paiExistente && paiExistente.nivel >= nivel) {
      return res.status(400).json({ erro: 'O nível do item deve ser maior que o nível do seu "idPai".' });
    }
 */
  // Verificar unicidade de nome para classificações no nível raiz (idPai === null)
if (idPai === null) {
  const nomeDuplicadoRaiz = await ClassificacaoProfissional.findOne({
    where: {
      nome,
      idPai: null, // Apenas verifica nomes na raiz
    },
  });

  if (nomeDuplicadoRaiz) {
    return res.status(400).json({ erro: 'Já existe uma classificação na raiz com este nome.' });
  }
}

// Verificar unicidade de nome dentro da mesma hierarquia para classificações com idPai
if (idPai !== null) {
  const nomeDuplicadoHierarquia = await ClassificacaoProfissional.findOne({
    where: {
      nome,
      idPai, // Apenas verifica nomes no mesmo nível de hierarquia
    },
  });

  if (nomeDuplicadoHierarquia) {
    return res.status(400).json({ erro: 'Já existe uma classificação com este nome no mesmo nível hierárquico.' });
  }
}

if (idPai !== null) {
  const paiDuplicado = await ClassificacaoProfissional.findOne({
    where: {
      nome,
      id:idPai, // Apenas verifica nomes no mesmo nível de hierarquia
    },
  });

  if (paiDuplicado ) {
    return res.status(400).json({ erro: 'Já existe um pai com este nome no mesmo nível hierárquico.' });
  }
}

    // Determinar o próximo nível
    if (idPai !== null && paiExistente.nivel >= nivel) {
      const nivelAnterior = await ClassificacaoProfissional.findOne({
        where: { idPai },
        attributes: [[fn('MAX', col('nivel')), 'nivelMaximo']],
        raw: true,
      });

      if (nivelAnterior && nivelAnterior.nivelMaximo !== null) {
        nivel = nivelAnterior.nivelMaximo + 1; // Incrementa ao maior nível encontrado
      } else {
        nivel = 2; // Define como o primeiro subnível do pai
      }
    } else if (!nivel) {
      nivel = 1; // Define como nível inicial para itens sem pai
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
