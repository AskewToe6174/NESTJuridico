const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AutoridadUnidad', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    autoridadId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "FK a autoridad",
      references: {
        model: 'autoridad',
        key: 'id'
      },
      field: 'autoridad_id'
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "Unidad\/oficina específica (p.ej. Admón Local SAT)"
    },
    codigo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contactoEmail: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: 'contacto_email'
    },
    contactoTelefono: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'contacto_telefono'
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
    tableName: 'autoridad_unidad',
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
        name: "fk_autoridad_unidad_autoridad",
        using: "BTREE",
        fields: [
          { name: "autoridad_id" },
        ]
      },
    ]
  });
};
