const Usuario = require('../Usuario');
const Empresa = require('../Empresa');
const VagaCobertura = require('../VagaCobertura');
const VagaAplicada = require('../VagaAplicada');

// Relacionamentos
Usuario.hasMany(VagaAplicada, { foreignKey: 'idUsuario', as: 'vagasAplicadas' });
VagaAplicada.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

Empresa.hasMany(VagaCobertura, { foreignKey: 'idEmpresa', as: 'vagas' });
VagaCobertura.belongsTo(Empresa, { foreignKey: 'idEmpresa', as: 'empresa' });

VagaCobertura.hasMany(VagaAplicada, { foreignKey: 'idCobertura', as: 'aplicacoes' });
VagaAplicada.belongsTo(VagaCobertura, { foreignKey: 'idCobertura', as: 'vaga' });

Empresa.hasMany(VagaAplicada, { foreignKey: 'idEmpresa', as: 'aplicacoes' });
VagaAplicada.belongsTo(Empresa, { foreignKey: 'idEmpresa', as: 'empresa' });

// Exporta todos os modelos
module.exports = {
    Usuario,
    Empresa,
    VagaCobertura,
    VagaAplicada,
};
