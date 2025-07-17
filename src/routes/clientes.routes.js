const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { upload } = require('../utils/storage');

const {
  sequelize,
  Clientes,
  ExpedienteGeneral,
  ClienteContacto,
  ClienteDocumento,
  CasoJuridico,
  CatAsunto,
  CatTerritorio
} = require('../models');


module.exports = router;
