const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const {
    Empresa,   
    VagaCobertura,
    Usuario

}=require('./associations/vagaAplicadaAssociation')

const VagaAplicada = sequelize.define('Vaga_Aplicada', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idCobertura:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:VagaCobertura,
            key:'id',
        }

    },
    idUsuario:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Usuario,
            key:'id',
        }

    },
    idEmpresa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Empresa, // Nome da tabela no banco de dados
            key: 'id',
        }
    },
    aceiteEmpresa:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    
}, {
    tableName: 'vagas_aplicadas', // Nome da tabela no banco de dados
    timestamps: true, // Inclui createdAt e updatedAt
});

module.exports = VagaAplicada;