const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const {
    Empresa,   
    VagaCobertura,
    Usuario

}=require('./associations/vagaAplicadaAssociation')


const RegistroContratacao= sequelize.define('Registro_Contratacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idVagaAplicada: {
        type: DataTypes.INTEGER,
        allowNull:false        
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
    dados: {
        type: DataTypes.JSON,
        allowNull: false,        
    },
    
    
}, {
    tableName: 'registros_contratacoes', // Nome da tabela no banco de dados
    timestamps: true, // Inclui createdAt e updatedAt
});

module.exports = {RegistroContratacao};