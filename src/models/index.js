// src/models/index.js
const sequelize = require('../config/db');
const initModels = require('./init-models');

const m = initModels(sequelize);

module.exports = {
  sequelize,
  // catálogos
  CatAsunto: m.CatAsunto,
  CatTerritorio: m.CatTerritorio,
  CatImpuesto: m.CatImpuesto,
  CatAutoridadNivel: m.CatAutoridadNivel,
  CatTipoDocumento: m.CatTipoDocumento,
  CatEstatusCaso:         m.CatEstatusCaso,    // ← aquí

  // autoridades
  Autoridad: m.Autoridad,
  AutoridadUnidad: m.AutoridadUnidad,
  // cliente + expediente
  Clientes: m.Clientes,
  Cliente: m.Clientes, // alias
  ClienteContacto: m.ClienteContacto,
  ClienteDocumento: m.ClienteDocumento,
  ExpedienteGeneral: m.ExpedienteGeneral,
  // empleados
  Empleado: m.Empleado,
  // casos
  
  CasoJuridico: m.CasoJuridico,
  CasoImpuesto: m.CasoImpuesto,
  CasoEmpleadoAsignacion: m.CasoEmpleadoAsignacion,
  CasoEmpleadoHistorial: m.CasoEmpleadoHistorial,
  CasoDocumento: m.CasoDocumento,
  CasoInteraccion: m.CasoInteraccion,
  CasoInteraccionDocumento: m.CasoInteraccionDocumento
};
