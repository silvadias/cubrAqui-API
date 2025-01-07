const axios = require('axios');

async function validarCEP(req, res, next) {
    const { cep } = req.body;

    if (!cep) {
        return res.status(400).json({ error: 'CEP é obrigatório!' });
    }

    try {
        const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (endereco.data.erro) {
            return res.status(400).json({ error: 'CEP não encontrado!' });
        }

        // Preenche automaticamente os campos no req.body
        req.body.logradouro = endereco.data.logradouro;
        req.body.bairro = endereco.data.bairro;
        req.body.localidade = endereco.data.localidade;
        req.body.uf = endereco.data.uf;
        req.body.estado = endereco.data.uf;
        req.body.ibge = endereco.data.ibge;
        req.body.ddd = endereco.data.ddd;
        req.body.siafi = endereco.data.siafi;

        console.log('✅ Middleware CEP: Endereço preenchido com sucesso.');
        next();
    } catch (error) {
        console.error('❌ Middleware CEP: Erro ao buscar CEP:', error.message);
        return res.status(500).json({ error: `Erro ao buscar CEP: ${error.message}` });
    }
}

module.exports = { validarCEP };
