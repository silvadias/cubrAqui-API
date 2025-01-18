const axios = require('axios');

async function validarGeolocalizacao(req, res, next) {
    const { logradouro, numero, bairro, localidade, uf } = req.body;

    // 🛡️ Validação inicial dos parâmetros obrigatórios
    if (!logradouro || !bairro || !localidade || !uf) {
        return res.status(400).json({
            error: 'Dados de endereço incompletos para buscar latitude e longitude.'
        });
    }

    try {
        // 📝 Monta o endereço completo, incluindo número se disponível
        const endereco = numero
            ? `${logradouro}, ${numero}, ${bairro}, ${localidade}, ${uf}, Brasil`
            : `${logradouro}, ${bairro}, ${localidade}, ${uf}, Brasil`;

        // 🌐 Faz a requisição para OpenCage Geocoder
        const apiKey = 'c2f377758dd04ce98ce1a2e25efda216';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(endereco)}&key=${apiKey}`;

        const resposta = await axios.get(url);

        // 🛡️ Verifica se há dados na resposta
        if (!resposta.data || !resposta.data.results || resposta.data.results.length === 0) {
            return res.status(400).json({
                error: 'Não foi possível obter latitude e longitude para o endereço informado.'
            });
        }

        // 📍 Preenche latitude e longitude no req.body
        const { lat, lng } = resposta.data.results[0].geometry;
        req.body.latitude = lat;
        req.body.longitude = lng;

        console.log('✅ Middleware Geo: Latitude e Longitude preenchidas com sucesso.');
        next();
    } catch (error) {
        console.error('❌ Middleware Geo: Erro ao buscar latitude e longitude:', error.message);
        return res.status(500).json({
            error: 'Erro ao buscar latitude e longitude. Tente novamente mais tarde.'
        });
    }
}

module.exports = { validarGeolocalizacao };