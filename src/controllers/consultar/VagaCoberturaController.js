const listaVagas = require('../../models/VagaCobertura');

module.exports = async (req, res) => {
    try {
        const listaVagasAbertas = await listaVagas.findAll();
        return res.status(200).json({ listaVagasAbertas });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao listar vagas", detalhes: error.message });
    }
};
