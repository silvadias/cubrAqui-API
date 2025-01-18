const axios = require('axios');

const buscarCEP = async (req, res) => {
    try {
        const { cep } = req.body;
        const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        
        if (endereco.data.erro) {
            return res.status(400).json({ error: 'CEP não encontrado!' });
        }
        
        return res.json(endereco.data);
    } catch (error) {
        return res.status(500).json({ error: `Erro ao buscar CEP: ${error.message}` });
    }
};

module.exports = { buscarCEP };
