/* eslint-disable */
var DataTypes = require("sequelize").DataTypes;
var _Autoridad = require("./autoridad");
var _AutoridadUnidad = require("./autoridadUnidad");
var _CasoDocumento = require("./casoDocumento");
var _CasoEmpleadoAsignacion = require("./casoEmpleadoAsignacion");
var _CasoEmpleadoHistorial = require("./casoEmpleadoHistorial");
var _CasoImpuesto = require("./casoImpuesto");
var _CasoInteraccion = require("./casoInteraccion");
var _CasoInteraccionDocumento = require("./casoInteraccionDocumento");
var _CasoJuridico = require("./casoJuridico");
var _CatAsunto = require("./catAsunto");
var _CatAutoridadNivel = require("./catAutoridadNivel");
var _CatImpuesto = require("./catImpuesto");
var _CatTerritorio = require("./catTerritorio");
var _CatTipoDocumento = require("./catTipoDocumento");
var _CatEstatusCaso = require("./CatEstatusCaso");   // <-- nuevo
var _ClienteContacto = require("./clienteContacto");
var _ClienteDocumento = require("./clienteDocumento");
var _Empleado = require("./empleado");
var _ExpedienteGeneral = require("./expedienteGeneral");
var _Clientes = require("./Clientes");

function initModels(sequelize) {
  var Autoridad = _Autoridad(sequelize, DataTypes);
  var AutoridadUnidad = _AutoridadUnidad(sequelize, DataTypes);
  var CasoDocumento = _CasoDocumento(sequelize, DataTypes);
  var CasoEmpleadoAsignacion = _CasoEmpleadoAsignacion(sequelize, DataTypes);
  var CasoEmpleadoHistorial = _CasoEmpleadoHistorial(sequelize, DataTypes);
  var CasoImpuesto = _CasoImpuesto(sequelize, DataTypes);
  var CasoInteraccion = _CasoInteraccion(sequelize, DataTypes);
  var CasoInteraccionDocumento = _CasoInteraccionDocumento(sequelize, DataTypes);
  var CasoJuridico = _CasoJuridico(sequelize, DataTypes);
  var CatAsunto = _CatAsunto(sequelize, DataTypes);
  var CatAutoridadNivel = _CatAutoridadNivel(sequelize, DataTypes);
  var CatImpuesto = _CatImpuesto(sequelize, DataTypes);
  var CatTerritorio = _CatTerritorio(sequelize, DataTypes);
  var CatTipoDocumento = _CatTipoDocumento(sequelize, DataTypes);
  var CatEstatusCaso = _CatEstatusCaso(sequelize, DataTypes);  // <-- instanciado
  var ClienteContacto = _ClienteContacto(sequelize, DataTypes);
  var ClienteDocumento = _ClienteDocumento(sequelize, DataTypes);
  var Empleado = _Empleado(sequelize, DataTypes);
  var ExpedienteGeneral = _ExpedienteGeneral(sequelize, DataTypes);
  var Clientes = _Clientes(sequelize, DataTypes);

  // ----- Asociaciones Cliente -----
  CasoJuridico.belongsTo(Clientes, { as: "cliente", foreignKey: "clienteId"});
  Clientes.hasMany(CasoJuridico, { as: "casoJuridicos", foreignKey: "clienteId"});

  ClienteContacto.belongsTo(Clientes, { as: "cliente", foreignKey: "clienteId"});
  Clientes.hasMany(ClienteContacto, { as: "clienteContactos", foreignKey: "clienteId"});

  ClienteDocumento.belongsTo(Clientes, { as: "cliente", foreignKey: "clienteId"});
  Clientes.hasMany(ClienteDocumento, { as: "clienteDocumentos", foreignKey: "clienteId"});

  ExpedienteGeneral.belongsTo(Clientes, { as: "cliente", foreignKey: "clienteId"});
  Clientes.hasOne(ExpedienteGeneral, { as: "expedienteGeneral", foreignKey: "clienteId"});

  // ----- Asociaciones Autoridad -----
  AutoridadUnidad.belongsTo(Autoridad, { as: "autoridad", foreignKey: "autoridadId"});
  Autoridad.hasMany(AutoridadUnidad, { as: "autoridadUnidads", foreignKey: "autoridadId"});

  CasoInteraccion.belongsTo(Autoridad, { as: "autoridad", foreignKey: "autoridadId"});
  Autoridad.hasMany(CasoInteraccion, { as: "casoInteraccions", foreignKey: "autoridadId"});

  CasoInteraccion.belongsTo(AutoridadUnidad, { as: "autoridadUnidad", foreignKey: "autoridadUnidadId"});
  AutoridadUnidad.hasMany(CasoInteraccion, { as: "casoInteraccions", foreignKey: "autoridadUnidadId"});

  // ----- Historial asignaciones -----
  CasoEmpleadoHistorial.belongsTo(CasoEmpleadoAsignacion, { as: "casoEmpleadoAsignacion", foreignKey: "casoEmpleadoAsignacionId"});
  CasoEmpleadoAsignacion.hasMany(CasoEmpleadoHistorial, { as: "casoEmpleadoHistorials", foreignKey: "casoEmpleadoAsignacionId"});

  // ----- Interacción docs -----
  CasoInteraccionDocumento.belongsTo(CasoInteraccion, { as: "casoInteraccion", foreignKey: "casoInteraccionId"});
  CasoInteraccion.hasMany(CasoInteraccionDocumento, { as: "casoInteraccionDocumentos", foreignKey: "casoInteraccionId"});

  // ----- Caso docs -----
  CasoDocumento.belongsTo(CasoJuridico, { as: "caso", foreignKey: "casoId"});
  CasoJuridico.hasMany(CasoDocumento, { as: "casoDocumentos", foreignKey: "casoId"});

  // ----- Caso asignaciones / empleados -----
  CasoEmpleadoAsignacion.belongsTo(CasoJuridico, { as: "caso", foreignKey: "casoId"});
  CasoJuridico.hasMany(CasoEmpleadoAsignacion, { as: "casoEmpleadoAsignacions", foreignKey: "casoId"});

  CasoEmpleadoAsignacion.belongsTo(Empleado, { as: "empleado", foreignKey: "empleadoId"});
  Empleado.hasMany(CasoEmpleadoAsignacion, { as: "casoEmpleadoAsignacions", foreignKey: "empleadoId"});

  // ----- Caso impuestos -----
  CasoImpuesto.belongsTo(CasoJuridico, { as: "caso", foreignKey: "casoId"});
  CasoJuridico.hasMany(CasoImpuesto, { as: "casoImpuestos", foreignKey: "casoId"});

  CasoImpuesto.belongsTo(CatImpuesto, { as: "impuesto", foreignKey: "impuestoId"});
  CatImpuesto.hasMany(CasoImpuesto, { as: "casoImpuestos", foreignKey: "impuestoId"});

  // ----- Caso territorio / asunto -----
  CasoJuridico.belongsTo(CatAsunto, { as: "asunto", foreignKey: "asuntoId"});
  CatAsunto.hasMany(CasoJuridico, { as: "casoJuridicos", foreignKey: "asuntoId"});

  CasoJuridico.belongsTo(CatTerritorio, { as: "territorio", foreignKey: "territorioId"});
  CatTerritorio.hasMany(CasoJuridico, { as: "casoJuridicos", foreignKey: "territorioId"});

  // ----- Caso estatus de caso -----
  CasoJuridico.belongsTo(CatEstatusCaso, { as: "estatus", foreignKey: "estatus_caso"});
  CatEstatusCaso.hasMany(CasoJuridico, { as: "casoJuridicos", foreignKey: "estatus_caso"});

  // ----- Tipo docs -----
  CasoDocumento.belongsTo(CatTipoDocumento, { as: "tipoDocumento", foreignKey: "tipoDocumentoId"});
  CatTipoDocumento.hasMany(CasoDocumento, { as: "casoDocumentos", foreignKey: "tipoDocumentoId"});

  ClienteDocumento.belongsTo(CatTipoDocumento, { as: "tipoDocumento", foreignKey: "tipoDocumentoId"});
  CatTipoDocumento.hasMany(ClienteDocumento, { as: "clienteDocumentos", foreignKey: "tipoDocumentoId"});

  // ----- Autoridad nivel -----
  Autoridad.belongsTo(CatAutoridadNivel, { as: "autoridadNivel", foreignKey: "autoridadNivelId"});
  CatAutoridadNivel.hasMany(Autoridad, { as: "autoridads", foreignKey: "autoridadNivelId"});

  return {
    Autoridad,
    AutoridadUnidad,
    CasoDocumento,
    CasoEmpleadoAsignacion,
    CasoEmpleadoHistorial,
    CasoImpuesto,
    CasoInteraccion,
    CasoInteraccionDocumento,
    CasoJuridico,
    CatAsunto,
    CatAutoridadNivel,
    CatImpuesto,
    CatTerritorio,
    CatTipoDocumento,
    CatEstatusCaso,          // <-- exportado
    ClienteContacto,
    ClienteDocumento,
    Empleado,
    ExpedienteGeneral,
    Clientes
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
