module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    id: {  // Campo de ID auto-incrementado
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // Indica que o campo será auto-incrementado
    },
    idEmpresa: {
      type: DataTypes.INTEGER, // ID da empresa (pode ser nulo, caso seja um endereço de usuário)
      allowNull: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER, // ID do usuário (pode ser nulo, caso seja um endereço de empresa)
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    complemento: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    bloco: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    apartamento: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tipo_local: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    referencia: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    enderecoReferencia: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tableName: 'enderecos',
    timestamps: false,

  });

  return Endereco;
};
