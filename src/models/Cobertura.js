const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Cobertura = sequelize.define('Cobertura', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idEmpresa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'empresas', // Nome da tabela no banco de dados
            key: 'id',
        }
    },
    valor: {
        type: DataTypes.DECIMAL(5, 2), // Máximo 5 dígitos, 2 casas decimais
        allowNull: false,
        validate: {
            min: 100,
            max: 200,
        }
    },
    servico: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    dataInicio: {
        type: DataTypes.DATEONLY, // Apenas data (YYYY-MM-DD)
        allowNull: false,
    },
    horaInicio: {
        type: DataTypes.STRING(5), // Formato HH:MM
        allowNull: false,
        validate: {
            is: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // Valida formato de hora
        }
    },
    dataFim: {
        type: DataTypes.DATEONLY, // Apenas data (YYYY-MM-DD)
        allowNull: false,
    },
    horaFim: {
        type: DataTypes.STRING(5), // Formato HH:MM
        allowNull: false,
        validate: {
            is: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // Valida formato de hora
        }
    },
    localServico: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    enderecoServico: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    observacao: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('aberta', 'concorrência', 'atribuída', 'exercida', 'executada', 'fechada'),
        allowNull: false,
        defaultValue: 'aberta',
    }
}, {
    tableName: 'coberturas', // Nome da tabela no banco de dados
    timestamps: true, // Inclui createdAt e updatedAt
});

module.exports = Cobertura;
