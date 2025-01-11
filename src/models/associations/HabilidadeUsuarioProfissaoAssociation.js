const Usuario = require('../Usuario');
const ClassificacaoProfissional = require('../classificacaoProfissional/ClassificacaoProfissional');
const HabilidadeProfissionalUsuario = require('../classificacaoProfissional/HabilidadeProfissionalUsuario');

// Configurar associações
Usuario.hasMany(HabilidadeProfissionalUsuario, { foreignKey: 'idUsuario', as: 'habilidades' });
ClassificacaoProfissional.hasMany(HabilidadeProfissionalUsuario, { foreignKey: 'idHabilidade', as: 'habilidades' });
HabilidadeProfissionalUsuario.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuarios' });
HabilidadeProfissionalUsuario.belongsTo(ClassificacaoProfissional, { foreignKey: 'idHabilidade', as: 'habilidade' });

module.exports = {
  Usuario,
  ClassificacaoProfissional,
  HabilidadeProfissionalUsuario,
};
