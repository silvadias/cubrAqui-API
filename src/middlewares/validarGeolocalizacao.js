const axios = require('axios');

async function validarGeolocalizacao(req, res, next) {
    const { logradouro, numero, bairro, localidade, uf } = req.body;

    if (!logradouro || !bairro || !localidade || !uf) {
        return res.status(400).json({
            error: 'Dados de endereço incompletos para buscar latitude e longitude.'
        });
    }

    try {
        // Monta o endereço completo, incluindo número (se disponível)
        let endereco = `${logradouro}, ${bairro}, ${localidade}, ${uf}, Brasil`;
        if (numero) {
            endereco = `${logradouro}, ${numero}, ${bairro}, ${localidade}, ${uf}, Brasil`;
        }

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;

        const resposta = await axios.get(url);

        if (resposta.data.length === 0) {
            return res.status(400).json({
                error: 'Não foi possível obter latitude e longitude para o endereço informado.'
            });
        }

        // Preenche latitude e longitude no req.body
        req.body.latitude = resposta.data[0].lat;
        req.body.longitude = resposta.data[0].lon;

        console.log('✅ Middleware Geo: Latitude e Longitude preenchidas com sucesso.');
        next();
    } catch (error) {
        console.error('❌ Middleware Geo: Erro ao buscar latitude e longitude:', error.message);
        return res.status(500).json({
            error: `Erro ao buscar latitude e longitude: ${error.message}`
        });
    }
}

module.exports = { validarGeolocalizacao };
