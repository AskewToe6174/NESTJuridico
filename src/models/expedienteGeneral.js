const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ExpedienteGeneral', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "FK a Clientes.id (cliente dueño del expediente)",
      references: {
        model: 'Clientes',
        key: 'id'
      },
      unique: "fk_expediente_cliente",
      field: 'cliente_id'
    },
    actaConstitutivaStatus: {
      type: DataTypes.ENUM('no_cargado','vigente','vencido','pendiente'),
      allowNull: true,
      defaultValue: "no_cargado",
      field: 'acta_constitutiva_status'
    },
    poderNotarialStatus: {
      type: DataTypes.ENUM('no_cargado','vigente','vencido','pendiente'),
      allowNull: true,
      defaultValue: "no_cargado",
      field: 'poder_notarial_status'
    },
    ineRlStatus: {
      type: DataTypes.ENUM('no_cargado','vigente','vencido','pendiente'),
      allowNull: true,
      defaultValue: "no_cargado",
      field: 'ine_rl_status'
    },
    comprobanteDomStatus: {
      type: DataTypes.ENUM('no_cargado','vigente','vencido','pendiente'),
      allowNull: true,
      defaultValue: "no_cargado",
      field: 'comprobante_dom_status'
    },
    csdStatus: {
      type: DataTypes.ENUM('no_cargado','vigente','vencido','pendiente'),
      allowNull: true,
      defaultValue: "no_cargado",
      field: 'csd_status'
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    },
    createdBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'updated_by'
    }
  }, {
    sequelize,
    tableName: 'expediente_general',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "uq_expediente_cliente",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
    ]
  });
};
