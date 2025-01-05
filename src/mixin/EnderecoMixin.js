const { DataTypes } = require('sequelize');

const EnderecoMixin = {
    cep: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            is: /^\d{8}$/, // Valida formato de 8 números no CEP
        },
    },
    logradouro: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    bairro: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    localidade: { // Cidade
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    uf: { // Estado (Sigla)
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    estado: { // Estado (Nome completo)
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    regiao: { // Região do estado (Norte, Sul, etc.)
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    ibge: { // Código IBGE do município
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    gia: { // Código GIA (usado em São Paulo para ICMS)
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    ddd: { // Código DDD
        type: DataTypes.STRING(3),
        allowNull: true,
    },
    siafi: { // Código SIAFI
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    numero: { // Número do imóvel
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    bloco: { // Bloco em condomínios
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    apartamento: { // Apartamento específico
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    setor: { // Setor ou área específica
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    tipo_local: { // Tipo do local (residencial, comercial, etc.)
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    referencia: { // Ponto de referência
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    latitude: { // Latitude para geolocalização
        type: DataTypes.DECIMAL(9, 6), // Exemplo: -23.550520
        allowNull: true,
    },
    longitude: { // Longitude para geolocalização
        type: DataTypes.DECIMAL(9, 6), // Exemplo: -46.633308
        allowNull: true,
    },
};

module.exports = EnderecoMixin;
