/**
 * Calcula as distâncias em quilômetros entre um ponto fixo e uma lista de pontos (vagas).
 * Utiliza a fórmula de Haversine diretamente.
 *
 * @param {number[]} pontoFixo - Coordenadas fixas do usuário [latitude, longitude].
 * @param {number[][]} vagasArray - Lista de coordenadas das vagas [[latitude, longitude], ...].
 * @returns {number[]} - Lista de distâncias em quilômetros.
 */
function calcularDistancias(pontoFixo, vagasArray) {
    let array
    (Array.isArray(pontoFixo))? array = "array": array = "não é array";
    console.log(array);
    if (!Array.isArray(pontoFixo) || pontoFixo.length !== 2 ||
        !Array.isArray(vagasArray) || !vagasArray.every(v => Array.isArray(v) && v.length === 2)) {
        throw new Error("Os parâmetros fornecidos não possuem o formato correto.");
    }

    const [lat1, lon1] = pontoFixo; // Extrai latitude e longitude do ponto fixo
    const R = 6371; // Raio médio da Terra em quilômetros

    // Calcula a distância para cada ponto no array de vagas
    return vagasArray.map(([lat2, lon2]) => {
        const dLat = (lat2 - lat1) * Math.PI / 180; // Diferença de latitude em radianos
        const dLon = (lon2 - lon1) * Math.PI / 180; // Diferença de longitude em radianos

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Retorna a distância em quilômetros
    });
}

module.exports={
    calcularDistancias

}