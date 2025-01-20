const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const EnderecoMixin = require('../mixin/EnderecoMixin');

const VagaCobertura = sequelize.define('Vaga_Cobertura', {
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
    vagas: {
        type: DataTypes.INTEGER,
        allowNull:false,        
    },
    valor: {
        type: DataTypes.DECIMAL(5, 2), // Máximo 5 dígitos, 2 casas decimais
        allowNull: false,
        validate: {
            min: 100,
            max: 200,
        }
    },
    especialista: { // profissional
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expandirEspecificidade:{
        type: DataTypes.INTEGER,
        allowNull:true,
    },
    comprovacaoTecnica:{
        type: DataTypes.STRING(255),
        allowNull:false,  
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
    kmAlcance: {
        type: DataTypes.DECIMAL(5,2),
        allowNull:false,        
    },    
    ...EnderecoMixin,
    observacao: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('aberta','fechada'),
        allowNull: false,
        defaultValue: 'aberta',
    }
}, {
    tableName: 'vagas_coberturas', // Nome da tabela no banco de dados
    timestamps: true, // Inclui createdAt e updatedAt
});

module.exports = VagaCobertura; 
