const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CasoImpuesto', {
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
    impuestoId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cat_impuesto',
        key: 'id'
      },
      field: 'impuesto_id'
    },
    montoEstimado: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true,
      field: 'monto_estimado'
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
    tableName: 'caso_impuesto',
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
        name: "uq_caso_impuesto",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "caso_id" },
          { name: "impuesto_id" },
        ]
      },
      {
        name: "fk_caso_impuesto_impuesto",
        using: "BTREE",
        fields: [
          { name: "impuesto_id" },
        ]
      },
    ]
  });
};
