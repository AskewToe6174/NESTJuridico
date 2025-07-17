// src/routes/casos.routes.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { upload } = require('../utils/storage');

const {
  CasoJuridico,
  Cliente,
  CatAsunto,
  CatTerritorio,
  CasoImpuesto,
  CatImpuesto,
  CasoEmpleadoAsignacion,
  Empleado,
  CasoEmpleadoHistorial,
  CasoDocumento,
  CatTipoDocumento,
  CasoInteraccion,
  Autoridad,
  AutoridadUnidad,
  CasoInteraccionDocumento,

} = require('../models');


// Crear caso y asignar empleado
router.post('/casos/nuevo', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      cliente_id,
      asunto_id,
      territorio_id,
      folio_dsb,
      no_oficio,
      mes_periodo,
      anio_periodo,
      prioridad,
      descripcion,
      notas_internas,
      empleado_id,
      rol,
      asignado_hasta,
      notas_asignacion,
      created_by
    } = req.body;

    const nuevoCaso = await CasoJuridico.create({
      cliente_id,
      asunto_id,
      territorio_id,
      folio_dsb,
      no_oficio,
      mes_periodo,
      anio_periodo,
      prioridad,
      descripcion,
      notas_internas,
      created_by
    }, { transaction: t });

    const asignacion = await CasoEmpleadoAsignacion.create({
      caso_id: nuevoCaso.id,
      empleado_id,
      rol: rol || 'responsable',
      asignado_hasta,
      notas: notas_asignacion,
      created_by
    }, { transaction: t });

    await t.commit();
    res.status(201).json({
      message: 'Caso creado y asignado exitosamente',
      caso: nuevoCaso,
      asignacion
    });
  } catch (e) {
    await t.rollback();
    console.error(e);
    res.status(500).json({ error: 'Error al crear caso y asignar empleado' });
  }
});

// Registrar interacción con autoridad o empleado
router.post('/casos/:casoId/interaccion', async (req, res) => {
  try {
    const {
      autoridad_id,
      autoridad_unidad_id,
      tipo_interaccion,
      comentario,
      resumen,
      estatus_autoridad,
      dias_plazo,
      fecha_limite_respuesta,
      created_by
    } = req.body;

    const nuevaInteraccion = await CasoInteraccion.create({
      caso_id: req.params.casoId,
      autoridad_id,
      autoridad_unidad_id,
      tipo_interaccion,
      comentario,
      resumen,
      estatus_autoridad,
      dias_plazo,
      fecha_limite_respuesta,
      created_by
    });

    res.status(201).json({
      message: 'Interacción registrada',
      interaccion: nuevaInteraccion
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al registrar interacción' });
  }
});


router.get('/:casoId/interacciones', async (req, res) => {
  try {
    const { casoId } = req.params;

    const interacciones = await CasoInteraccion.findAll({
      where: { caso_id: casoId },
      attributes: [
        'id',
        'tipo_interaccion',
        'comentario',
        'resumen',
        'estatus_autoridad',
        'dias_plazo',
        'fecha_limite_respuesta',
        'fecha_evento',
        'created_by'
      ],
      include: [
        {
          model: Autoridad,
          as: 'autoridad',
          attributes: ['id','nombre']
        },
        {
          model: AutoridadUnidad,
          as: 'autoridadUnidad',
          attributes: ['id','nombre']
        },
        {
          model: CasoInteraccionDocumento,
          as: 'casoInteraccionDocumentos',
          attributes: ['id','titulo','storage_path','created_at']
        }
      ],
      order: [['fecha_evento','ASC']]
    });

    // Dar formato de JSON plano si lo prefieres
    const result = interacciones.map(i => ({
      id:               i.id,
      tipo:             i.tipo_interaccion,
      comentario:       i.comentario,
      resumen:          i.resumen,
      estatusAutoridad: i.estatus_autoridad,
      diasPlazo:        i.dias_plazo,
      fechaLimite:      i.fecha_limite_respuesta,
      fechaEvento:      i.fecha_evento,
      creadoPor:        i.created_by,
      autoridad: i.autoridad
        ? { id: i.autoridad.id, nombre: i.autoridad.nombre }
        : null,
      unidad: i.autoridadUnidad
        ? { id: i.autoridadUnidad.id, nombre: i.autoridadUnidad.nombre }
        : null,
      documentos: i.casoInteraccionDocumentos.map(doc => ({
        id:          doc.id,
        titulo:      doc.titulo,
        ruta:        doc.storage_path,
        creadoEn:    doc.created_at
      }))
    }));

    res.json(result);
  } catch (e) {
    sendErr(res, e);
  }
});

module.exports = router;
