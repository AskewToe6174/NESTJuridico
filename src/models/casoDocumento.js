const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CasoDocumento', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    casoId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'caso_juridico',
        key: 'id'
      },
      field: 'caso_id'
    },
    tipoDocumentoId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
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
      type: DataTypes.STRING(1024),
      allowNull: false,
      field: 'storage_path'
    },
    version: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fechaDocumento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'fecha_documento'
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
    tableName: 'caso_documento',
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
        name: "fk_caso_documento_caso",
        using: "BTREE",
        fields: [
          { name: "caso_id" },
        ]
      },
      {
        name: "idx_caso_documento_tipo",
        using: "BTREE",
        fields: [
          { name: "tipo_documento_id" },
        ]
      },
    ]
  });
};
