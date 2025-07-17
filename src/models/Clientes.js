/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  const Clientes = sequelize.define('Clientes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    idPlaza: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idPlaza'
    },
    idPromotor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idPromotor'
    },
    idGrupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idGrupo'
    },
    idTipoCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idTipoCliente'
    },
    idTipoOperacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idTipoOperacion'
    },
    idTipoServicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idTipoServicio'
    },
    razonSocial: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'razonSocial'
    },
    responsableSolidario: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'responsableSolidario'
    },
    rfc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'rfc'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt'
    }
  }, {
    tableName: 'Clientes',
    timestamps: false,     // ya existen campos createdAt/updatedAt
    underscored: false,    // <-- IMPORTANTE: NO convertir a snake_case
    freezeTableName: true  // usa exactamente 'Clientes'
  });

  return Clientes;
};
