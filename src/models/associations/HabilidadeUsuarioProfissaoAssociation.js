const Usuario 
= require('../Usuario');

const ClassificacaoProfissional 
= require('../classificacaoProfissional/ClassificacaoProfissional');

const HabilidadeProfissionalUsuario 
= require('../classificacaoProfissional/HabilidadeProfissionalUsuario');

Usuario.belongsToMany(ClassificacaoProfissional,
  {
  through: HabilidadeProfissionalUsuario,
  foreignKey:'idUsuario'
  });

ClassificacaoProfissional.belongsToMany(Usuario,
  {
    through: HabilidadeProfissionalUsuario,
    foreignKey:'idHabilidade'
  });

Usuario.belongsTo(ClassificacaoProfissional,
  {
    foreignKey:'idUsuario'
  });

module.exports = {
  Usuario,
  ClassificacaoProfissional,
  HabilidadeProfissionalUsuario,
};
