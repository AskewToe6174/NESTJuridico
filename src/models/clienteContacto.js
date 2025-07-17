const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ClienteContacto', {
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
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    puesto: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Puesto dentro de la empresa cliente"
    },
    principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "1=contacto principal"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
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
    tableName: 'cliente_contacto',
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
        name: "fk_contacto_cliente",
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
      {
        name: "idx_contacto_correo",
        using: "BTREE",
        fields: [
          { name: "correo" },
        ]
      },
    ]
  });
};
