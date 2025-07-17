const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Autoridad', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    autoridadNivelId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "FK a cat_autoridad_nivel",
      references: {
        model: 'cat_autoridad_nivel',
        key: 'id'
      },
      field: 'autoridad_nivel_id'
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "Nombre de la autoridad (SAT, IMSS, Tribunal...)",
      unique: "uq_autoridad_nombre"
    },
    sigla: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Sigla \/ acrónimo"
    },
    sitioWeb: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "URL informativa opcional",
      field: 'sitio_web'
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
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
    tableName: 'autoridad',
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
        name: "uq_autoridad_nombre",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre" },
        ]
      },
      {
        name: "fk_autoridad_nivel",
        using: "BTREE",
        fields: [
          { name: "autoridad_nivel_id" },
        ]
      },
    ]
  });
};
