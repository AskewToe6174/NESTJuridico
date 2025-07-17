const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CasoInteraccion', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    casoId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: 'caso_juridico', key: 'id' },
      field: 'caso_id'
    },
    autoridadId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: { model: 'autoridad', key: 'id' },
      field: 'autoridad_id'
    },
    autoridadUnidadId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: { model: 'autoridad_unidad', key: 'id' },
      field: 'autoridad_unidad_id'
    },
    tipoInteraccion: {
      type: DataTypes.ENUM('oficio_recibido','respuesta_enviada','prorroga','resolucion','seguimiento','otro'),
      allowNull: false,
      defaultValue: "otro",
      field: 'tipo_interaccion'
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estatusAutoridad: {
      type: DataTypes.ENUM('pendiente','enviado','recibido','aceptado','rechazado','cerrado'),
      allowNull: true,
      defaultValue: "pendiente",
      field: 'estatus_autoridad'
    },

    /* ===== NUEVOS CAMPOS DE PLAZO ===== */
    diasPlazo: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
      field: 'dias_plazo'
    },
    fechaLimiteRespuesta: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'fecha_limite_respuesta'
    },
    /* ================================== */

    fechaEvento: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'fecha_evento'
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
    tableName: 'caso_interaccion',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    indexes: [
      { name: "PRIMARY", unique: true, using: "BTREE", fields: [ { name: "id" } ] },
      { name: "fk_caso_interaccion_caso", using: "BTREE", fields: [ { name: "caso_id" } ] },
      { name: "fk_caso_interaccion_autoridad", using: "BTREE", fields: [ { name: "autoridad_id" } ] },
      { name: "fk_caso_interaccion_aut_unidad", using: "BTREE", fields: [ { name: "autoridad_unidad_id" } ] },
      { name: "idx_caso_interaccion_fecha", using: "BTREE", fields: [ { name: "fecha_evento" } ] },
      { name: "idx_caso_interaccion_tipo", using: "BTREE", fields: [ { name: "tipo_interaccion" } ] },
      { name: "idx_caso_interaccion_limite", using: "BTREE", fields: [ { name: "fecha_limite_respuesta" } ] }
    ]
  });
};
