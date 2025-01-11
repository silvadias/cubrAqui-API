const { Usuario, ClassificacaoProfissional, HabilidadeProfissionalUsuario } = require('../../models/associations/HabilidadeUsuarioProfissaoAssociation');

// Registro de habilidade para o usuário
async function registrar(req, res) {
  try {
    const { idUsuario, idHabilidade } = req.body;
    
   

    // Validar entrada
    if (!Number.isInteger(idUsuario) || !Number.isInteger(idHabilidade)) {
      return res.status(400).json({ erro: 'Os campos "idUsuario" e "idHabilidade" devem ser números inteiros.' });
    }

    // Verificar se a relação já existe
    const [novaRelacao, criado] = await HabilidadeProfissionalUsuario.findOrCreate({
      where: { idUsuario, idHabilidade },
    });

    if (!criado) {
      return res.status(400).json({ erro: 'A relação entre o usuário e a habilidade já existe.' });
    }

    return res.status(201).json({ mensagem: 'Habilidade registrada com sucesso.', dados: novaRelacao });
  } catch (erro) {
    console.error('Erro ao registrar habilidade:', erro);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

// Obter habilidades de um usuário
async function getHabilidadeUsuario(req, res) {
  try {
    const { idUsuario } = req.body;
    //console.log(idUsuario);

    //return res.status(200).json({message: idUsuario});
    // Validar entrada
    if (!Number.isInteger(Number(idUsuario))) {
      return res.status(400).json({ erro: 'O campo "idUsuario" deve ser um número inteiro.' });
    }

    // Verificar se o usuário existe e incluir habilidades relacionadas
    const usuario = await Usuario.findByPk(idUsuario, {
      include: [
        {
          model: HabilidadeProfissionalUsuario,
          as: 'habilidades',
          include: [
            {
              model: ClassificacaoProfissional,
              as: 'habilidade',
              attributes: ['id', 'nome'],
            },
          ],
        },
      ],
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    // Mapear habilidades em um formato mais limpo
    const habilidades = usuario.habilidades.map((habilidadeRel) => ({
      id: habilidadeRel.habilidade.id,
      nome: habilidadeRel.habilidade.nome,
    }));

    return res.json({ usuario: usuario.nome, habilidades });
  } catch (erro) {
    console.error('Erro ao obter habilidades do usuário:', erro);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

module.exports = { registrar, getHabilidadeUsuario };
