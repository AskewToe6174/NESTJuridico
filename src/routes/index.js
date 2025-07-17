const express = require('express');
const router = express.Router();

// Importa subrutas
const catalogos = require('./catalogos.routes');
const clientes = require('./clientes.routes');
const empleados = require('./empleados.routes');
const casos = require('./casos.routes');

// Base: /api/v1/cat → catálogos
router.use('/cat', catalogos);

// Base: /api/v1/clientes → clientes
router.use('/clientes', clientes);

// Base: /api/v1/empleados → empleados
router.use('/empleados', empleados);

// Base: /api/v1/casos → casos
router.use('/casos', casos);

module.exports = router;
