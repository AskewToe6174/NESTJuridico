const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CasoEmpleadoAsignacion', {
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
    empleadoId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'empleado',
        key: 'id'
      },
      field: 'empleado_id'
    },
    rol: {
      type: DataTypes.ENUM('responsable','apoyo','revisor','otro'),
      allowNull: false,
      defaultValue: "responsable",
      comment: "Rol dentro del caso"
    },
    asignadoDesde: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'asignado_desde'
    },
    asignadoHasta: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'asignado_hasta'
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
    tableName: 'caso_empleado_asignacion',
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
        name: "idx_caso_empleado_activo",
        using: "BTREE",
        fields: [
          { name: "caso_id" },
          { name: "asignado_hasta" },
        ]
      },
      {
        name: "idx_empleado_activo",
        using: "BTREE",
        fields: [
          { name: "empleado_id" },
          { name: "asignado_hasta" },
        ]
      },
    ]
  });
};
