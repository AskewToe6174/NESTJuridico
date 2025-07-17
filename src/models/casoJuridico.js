const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const CasoJuridico = sequelize.define('CasoJuridico', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "FK a Clientes.id (dueño del caso)",
      field: 'cliente_id',
      references: {
        model: 'Clientes',
        key: 'id'
      }
    },
    asuntoId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "Tipo de asunto jurídico",
      field: 'asunto_id',
      references: {
        model: 'cat_asunto',
        key: 'id'
      }
    },
    territorioId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "Jurisdicción aplicable",
      field: 'territorio_id',
      references: {
        model: 'cat_territorio',
        key: 'id'
      }
    },
    folioDsb: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'folio_dsb',
      comment: "Folio interno (ej. DSB-yyyymm-####)"
    },
    noOficio: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: 'no_oficio',
      comment: "Folio/referencia de autoridad"
    },
    mesPeriodo: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      field: 'mes_periodo',
      comment: "Mes fiscal (1-12)"
    },
    anioPeriodo: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
      field: 'anio_periodo',
      comment: "Año fiscal"
    },
    estatusCaso: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 1,  // 1 = abierto
      field: 'estatus_caso',
      comment: "Estatus numérico del caso",
      references: {
        model: 'cat_estatus_caso',
        key: 'id'
      }
    },
    prioridad: {
      type: DataTypes.ENUM('baja','media','alta','urgente'),
      allowNull: true,
      defaultValue: 'media'
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notasInternas: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'notas_internas'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    tableName: 'caso_juridico',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    indexes: [
      { name: 'PRIMARY', unique: true, using: 'BTREE', fields: ['id'] },
      { name: 'fk_caso_territorio', using: 'BTREE', fields: ['territorio_id'] },
      { name: 'idx_caso_cliente', using: 'BTREE', fields: ['cliente_id'] },
      { name: 'idx_caso_asunto', using: 'BTREE', fields: ['asunto_id'] },
      { name: 'idx_caso_periodo', using: 'BTREE', fields: ['anio_periodo', 'mes_periodo'] },
      { name: 'idx_caso_estatus', using: 'BTREE', fields: ['estatus_caso'] }
    ]
  });

  // Asociación con CatEstatusCaso (opcional)
  CasoJuridico.associate = models => {
    CasoJuridico.belongsTo(models.CatEstatusCaso, {
      foreignKey: 'estatus_caso',
      as: 'estatus'
    });
  };

  return CasoJuridico;
};
