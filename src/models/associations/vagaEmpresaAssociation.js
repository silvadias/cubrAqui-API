const Vagas = require('../../models/VagaCobertura');
const Empresa = require('../../models/Empresa');
const EnderecoEmpresa = require('../../models/EnderecoEmpresa');
const ClassificacaoProfissional = require('../../models/classificacaoProfissional/ClassificacaoProfissional');

// Associações existentes
Empresa.hasOne(EnderecoEmpresa, { foreignKey: 'idEmpresa' });
EnderecoEmpresa.belongsTo(Empresa, { foreignKey: 'idEmpresa' });

Empresa.hasMany(Vagas, { foreignKey: 'idEmpresa' });
Vagas.belongsTo(Empresa, { foreignKey: 'idEmpresa' });

// Nova associação com ClassificacaoProfissional
ClassificacaoProfissional.hasMany(ClassificacaoProfissional, { as: 'subclasses', foreignKey: 'idPai' });
ClassificacaoProfissional.belongsTo(ClassificacaoProfissional, { as: 'pai', foreignKey: 'idPai' });

Vagas.belongsTo(ClassificacaoProfissional, { foreignKey: 'especialista' });
ClassificacaoProfissional.hasMany(Vagas, { foreignKey: 'especialista' });



module.exports = { Vagas, Empresa, EnderecoEmpresa, ClassificacaoProfissional };







/* const Vagas = require('../../models/VagaCobertura');
const Empresa = require('../../models/Empresa');
const EnderecoEmpresa = require('../../models/EnderecoEmpresa');
const ClassificacaoProfissional = require('../../models/classificacaoProfissional/ClassificacaoProfissional');


Empresa.hasOne(EnderecoEmpresa, { foreignKey: 'idEmpresa' });
EnderecoEmpresa.belongsTo(Empresa, { foreignKey: 'idEmpresa' });

Empresa.hasMany(Vagas, { foreignKey: 'idEmpresa' });
Vagas.belongsTo(Empresa, { foreignKey: 'idEmpresa' });

module.exports = { Vagas, Empresa, EnderecoEmpresa }; */