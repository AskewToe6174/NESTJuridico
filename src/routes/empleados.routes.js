const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const {
  sequelize,
  Empleado,
  CasoEmpleadoAsignacion,
  CasoJuridico,
  Clientes
} = require('../models');

router.post('/', async (req, res) => {
  try {
    const empleado = await Empleado.create(req.body);
    res.status(201).json(empleado);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
});

// Endpoint: casos preview con estatus numérico directo
router.get('/casos/preview', async (req, res) => {
  try {
    // 1. Obtener empleados activos
    const empleados = await Empleado.findAll({
      where: { deleted_at: null, activo: 1 },
      attributes: [
        ['id', 'empleadoId'],
        [sequelize.literal("CONCAT(nombre, ' ', IFNULL(apellido, ''))"), 'nombreEmpleado']
      ],
      raw: true
    });

    // 2. Para cada empleado, obtener preview de casos
    const result = await Promise.all(
      empleados.map(async empleado => {
        const casos = await sequelize.query(
          `
          SELECT
            cj.id                         AS casoId,
            cl.razonSocial                AS razonSocial,
            ca.nombre                     AS asunto,
            ct.nombre                     AS territorio,
            cj.folio_dsb                  AS folioInterno,
            cj.no_oficio                  AS folioAutoridad,
            ci.fecha_limite_respuesta     AS fechaVencimiento,
            cj.estatus_caso               AS estatusCaso,
            ci.tipo_interaccion           AS ultimaInteraccion,
            ci.fecha_evento               AS fechaUltimaInteraccion
          FROM caso_empleado_asignacion cea
            INNER JOIN caso_juridico    cj ON cj.id = cea.caso_id
            INNER JOIN Clientes         cl ON cl.id = cj.cliente_id
            INNER JOIN cat_asunto       ca ON ca.id = cj.asunto_id
            INNER JOIN cat_territorio   ct ON ct.id = cj.territorio_id
            LEFT JOIN (
              SELECT ci1.caso_id,
                     ci1.tipo_interaccion,
                     ci1.fecha_evento,
                     ci1.fecha_limite_respuesta
              FROM caso_interaccion ci1
              INNER JOIN (
                SELECT caso_id, MAX(fecha_evento) AS max_fecha
                FROM caso_interaccion
                GROUP BY caso_id
              ) ult ON ci1.caso_id = ult.caso_id
                   AND ci1.fecha_evento = ult.max_fecha
            ) ci ON ci.caso_id = cj.id
          WHERE
            cea.empleado_id = :empleadoId
            AND cj.estatus_caso IN (0,1,2,3)
            AND cea.deleted_at IS NULL
          `,
          {
            replacements: { empleadoId: empleado.empleadoId },
            type: QueryTypes.SELECT
          }
        );

        return {
          empleadoId: empleado.empleadoId,
          nombreEmpleado: empleado.nombreEmpleado,
          totalCasos: casos.length,
          casos: casos.map(c => ({
            id: c.casoId,
            razonSocial: c.razonSocial,
            asunto: c.asunto,
            territorio: c.territorio,
            folioInterno: c.folioInterno,
            folioAutoridad: c.folioAutoridad,
            fechaVencimiento: c.fechaVencimiento,
            estatusCaso: c.estatusCaso,
            ultimaInteraccion: c.ultimaInteraccion || 'sin registro',
            fechaUltimaInteraccion: c.fechaUltimaInteraccion || null
          }))
        };
      })
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener información de empleados y casos' });
  }
});




router.get('/:empleadoId', async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.empleadoId);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
});




router.patch('/:empleadoId', async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.empleadoId);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    await empleado.update(req.body);
    res.json(empleado);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
});

module.exports = router;
