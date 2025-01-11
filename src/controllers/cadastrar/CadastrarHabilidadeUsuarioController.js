const HabilidadeProfissionalUsuario = require('../../models/HabilidadeProfissionalUsuario');
const Usuario = require('../../models/Usuario');
const ClassificacaoProfissional = require('../../models/classificacaoProfissional/ClassificacaoProfissional');


async function registrar(req, res) {
  try {
    const { idUsuario, idHabilidade } = req.body;

    // Verificar se os campos foram fornecidos
    if (!idUsuario || !idHabilidade) {
      return res.status(400).json({ erro: 'Os campos "idUsuario" e "idHabilidade" são obrigatórios.' });
    }

    // Verificar se o usuário existe
    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    // Verificar se a habilidade existe
    const habilidade = await ClassificacaoProfissional.findByPk(idHabilidade);
    if (!habilidade) {
      return res.status(404).json({ erro: 'Habilidade não encontrada.' });
    }

    // Verificar se a relação já existe
    const relacaoExistente = await HabilidadeProfissionalUsuario.findOne({
      where: { idUsuario, idHabilidade },
    });

    if (relacaoExistente) {
      return res.status(400).json({ erro: 'A relação entre o usuário e a habilidade já existe.' });
    }

    // Criar a relação
    const novaRelacao = await HabilidadeProfissionalUsuario.create({ idUsuario, idHabilidade });
    return res.status(201).json({ mensagem: 'Habilidade registrada com sucesso.', dados: novaRelacao });
  } catch (erro) {
    console.error('Erro ao registrar habilidade:', erro);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

async function getHabilidadeUsuario(req, res) {
  try {
    const { idUsuario } = req.params;

    // Verificar se o usuário existe
    const usuario = await Usuario.findByPk(idUsuario, {
      include: [
        {
          model: HabilidadeProfissionalUsuario,
          as: 'habilidades',
          include: {
            model: ClassificacaoProfissional,
            as: 'habilidade',
            attributes: ['id', 'nome'], // Ajuste conforme o modelo
          },
        },
      ],
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ dados: usuario.habilidades });
  } catch (erro) {
    console.error('Erro ao obter habilidades do usuário:', erro);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

module.exports = { registrar, getHabilidadeUsuario };
