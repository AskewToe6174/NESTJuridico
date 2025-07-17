const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ClienteDocumento', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "FK a Clientes.id",
      references: {
        model: 'Clientes',
        key: 'id'
      },
      field: 'cliente_id'
    },
    tipoDocumentoId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "Tipo de documento (Acta, Poder, etc.)",
      references: {
        model: 'cat_tipo_documento',
        key: 'id'
      },
      field: 'tipo_documento_id'
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storagePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Ruta\/URL en almacenamiento (S3, NAS...)",
      field: 'storage_path'
    },
    version: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: "Control de versiones"
    },
    vigenteDesde: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'vigente_desde'
    },
    vigenteHasta: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'vigente_hasta'
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
    tableName: 'cliente_documento',
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
        name: "fk_cliente_documento_cliente",
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
      {
        name: "idx_cliente_documento_tipo",
        using: "BTREE",
        fields: [
          { name: "tipo_documento_id" },
        ]
      },
      {
        name: "idx_cliente_documento_path",
        using: "BTREE",
        fields: [
          { name: "storage_path" },
        ]
      },
    ]
  });
};
