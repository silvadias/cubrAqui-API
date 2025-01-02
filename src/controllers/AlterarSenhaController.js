const Usuario = require('../models/Usuario');
const Empresa = require('../models/Empresa');
const Criptografia = require('../middlewares/criptografia'); // Importa o middleware de criptografia

module.exports = async (req, res) => {
    const solicitante = req.usuario.id; // ID extraído do token
    const pessoa = req.usuario.pessoa; // Tipo da pessoa (física ou jurídica)
    const { novaSenha } = req.body; // Apenas novaSenha vem do corpo da requisição

    try {
        // Valida se a nova senha não é vazia e tem pelo menos 6 caracteres
        if (!novaSenha || novaSenha.length < 6) {
            return res.status(400).json({ message: 'A nova senha deve ter pelo menos 6 caracteres.' });
        }

        // Criptografa a nova senha antes de salvar no banco
        const senhaCriptografada = await Criptografia.gerar(novaSenha);

        let senhaTrocada;

        if (pessoa === 'física') {
            senhaTrocada = await Usuario.update(
                { senha: senhaCriptografada },
                { where: { id: solicitante } } // Usa o ID do token
            );
        } else if (pessoa === 'jurídica') {
            senhaTrocada = await Empresa.update(
                { senha: senhaCriptografada },
                { where: { id: solicitante } } // Usa o ID do token
            );
        } else {
            return res.status(400).json({ message: 'Tipo de pessoa inválido.' });
        }

        if (senhaTrocada[0] === 0) { // Verifica se alguma linha foi afetada
            return res.status(400).json({ message: 'Não foi possível trocar a senha.' });
        }

        return res.status(200).json({ message: 'Senha alterada com sucesso!' });
    } catch (erro) {
        console.error('❌ Erro ao alterar a senha:', erro);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};