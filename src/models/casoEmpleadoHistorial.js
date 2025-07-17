const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CasoEmpleadoHistorial', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    casoEmpleadoAsignacionId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'caso_empleado_asignacion',
        key: 'id'
      },
      field: 'caso_empleado_asignacion_id'
    },
    evento: {
      type: DataTypes.ENUM('creacion','transferencia','cambio_rol','cierre_asignacion','reactivacion'),
      allowNull: false
    },
    detalle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eventoFecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'evento_fecha'
    },
    eventoPor: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'evento_por'
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
    tableName: 'caso_empleado_historial',
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
        name: "fk_caso_empleado_hist_asig",
        using: "BTREE",
        fields: [
          { name: "caso_empleado_asignacion_id" },
        ]
      },
      {
        name: "idx_caso_empleado_hist_evento",
        using: "BTREE",
        fields: [
          { name: "evento_fecha" },
        ]
      },
    ]
  });
};
