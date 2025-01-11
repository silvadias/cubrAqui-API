const ClassificacaoProfissional = require('../../models/classificacaoProfissional/ClassificacaoProfissional');
const { fn, col } = require('sequelize');

// Função para validar duplicidade de nome no nível raiz
async function validarNomeNoNivelRaiz(nome) {
  return await ClassificacaoProfissional.findOne({
    where: { nome, idPai: null },
  });
}

// Função para validar duplicidade de nome dentro da mesma hierarquia
async function validarNomeNaHierarquia(nome, idPai) {
  return await ClassificacaoProfissional.findOne({
    where: { nome, idPai },
  });
}

// Função para validar duplicidade de nome do pai no mesmo nível
async function validarNomeDoPai(nome, idPai) {
  return await ClassificacaoProfissional.findOne({
    where: { nome, id: idPai },
  });
}

// Função principal de registro
async function registrar(req, res) {
  try {
    const { nome, idPai } = req.body;
    let { nivel } = req.body; // Permitir reatribuição de valor

    // Validação de campos obrigatórios
    if (!nome) {
      return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
    }

    // Validação do ID do pai (se fornecido)
    if (idPai !== null && !(Number.isInteger(idPai) && idPai >= 1)) {
      return res.status(400).json({
        erro: 'O campo "idPai" deve ser um número maior que zero ou nulo para itens na raiz da hierarquia.',
      });
    }

    const paiExistente = idPai ? await ClassificacaoProfissional.findByPk(idPai) : null;

    if (!paiExistente && idPai !== null) {
      return res.status(400).json({ erro: 'O "idPai" fornecido não existe.' });
    }

    // Verificar unicidade do nome no nível raiz
    if (idPai === null) {
      const nomeDuplicadoRaiz = await validarNomeNoNivelRaiz(nome);
      if (nomeDuplicadoRaiz) {
        return res.status(400).json({ erro: 'Já existe uma classificação na raiz com este nome.' });
      }
    }

    // Verificar unicidade do nome na mesma hierarquia
    if (idPai !== null) {
      const nomeDuplicadoHierarquia = await validarNomeNaHierarquia(nome, idPai);
      if (nomeDuplicadoHierarquia) {
        return res.status(400).json({
          erro: 'Já existe uma classificação com este nome no mesmo nível hierárquico.',
        });
      }

      const paiDuplicado = await validarNomeDoPai(nome, idPai);
      if (paiDuplicado) {
        return res.status(400).json({
          erro: 'Já existe um pai com este nome no mesmo nível hierárquico.',
        });
      }
    }

    // Determinar o nível da nova classificação
    if (idPai !== null) {
      const nivelAnterior = await ClassificacaoProfissional.findOne({
        where: { idPai },
        attributes: [[fn('MAX', col('nivel')), 'nivelMaximo']],
        raw: true,
      });

      if (nivelAnterior && nivelAnterior.nivelMaximo !== null) {
        nivel = nivelAnterior.nivelMaximo + 1;
      } else {
        nivel = 2; // Primeiro subnível do pai
      }
    } else if (!nivel) {
      nivel = 1; // Nível inicial para itens na raiz
    }

    // Criar nova classificação
    const novaClassificacao = await ClassificacaoProfissional.create({
      nome,
      idPai,
      nivel,
    });

    console.log('Nova classificação criada:', novaClassificacao);

    return res.status(201).json({
      mensagem: 'Classificação cadastrada com sucesso!',
      dados: novaClassificacao,
    });
  } catch (erro) {
    console.error('Erro no registro de classificação:', erro);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

module.exports = { registrar };
