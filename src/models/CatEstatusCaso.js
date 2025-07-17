module.exports = (sequelize, DataTypes) => {
  const CatEstatusCaso = sequelize.define('CatEstatusCaso', {
    id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true
    },
    nombre: DataTypes.STRING(50)
  }, {
    tableName: 'cat_estatus_caso',
    timestamps: false
  });
  return CatEstatusCaso;
};
