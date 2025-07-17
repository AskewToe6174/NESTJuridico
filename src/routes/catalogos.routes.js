const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  sequelize,
  CatAsunto,
  CatTerritorio,
  CatImpuesto,
  CatAutoridadNivel,
  Autoridad,
  AutoridadUnidad,
  CatTipoDocumento,
  CatEstatusCaso,
  Empleado
} = require('../models');

const sendErr = (res, e) => { console.error(e); res.status(500).json({ error: e.message || e }); };

/* ---- GET Catalogos ---- */
router.get('/asuntos', async (req, res) => {
  try {
    const rows = await CatAsunto.findAll({ where: { activo: 1 }, order: [['nombre','ASC']] });
    res.json(rows);
  } catch (e) { sendErr(res,e); }
});
router.get('/territorios', async (req, res) => {
  try {
    const rows = await CatTerritorio.findAll({ where: { activo: 1 }, order: [['nombre','ASC']] });
    res.json(rows);
  } catch (e) { sendErr(res,e); }
});
router.get('/impuestos', async (req, res) => {
  try {
    const rows = await CatImpuesto.findAll({ where: { activo: 1 }, order: [['nombre','ASC']] });
    res.json(rows);
  } catch (e) { sendErr(res,e); }
});
router.get('/autoridades/niveles', async (req, res) => {
  try {
    const rows = await CatAutoridadNivel.findAll({ where: { activo: 1 }, order: [['nombre','ASC']] });
    res.json(rows);
  } catch (e) { sendErr(res,e); }
});
router.get('/autoridades', async (req, res) => {
  try {
    const { q, nivelId } = req.query;
    const where = { activo: 1 };
    if (nivelId) where.autoridadNivelId = nivelId;
    if (q) where.nombre = { [Op.like]: `%${q}%` };
    const rows = await Autoridad.findAll({
      where,
      include: [{ model: CatAutoridadNivel, as: 'nivel', attributes: ['id','nombre'] }],
      order: [['nombre','ASC']]
    });
    res.json(rows.map(r => r.toJSON()));
  } catch (e) { sendErr(res,e); }
});
router.get('/autoridades/:autoridadId/unidades', async (req, res) => {
  try {
    const rows = await AutoridadUnidad.findAll({
      where: { autoridadId: req.params.autoridadId, activo: 1 },
      order: [['nombre','ASC']]
    });
    res.json(rows);
  } catch (e) { sendErr(res,e); }
});
router.get('/tipos-documento', async (req, res) => {
  try {
    const rows = await CatTipoDocumento.findAll({ where: { activo: 1 }, order: [['nombre','ASC']] });
    res.json(rows);
  } catch (e) { sendErr(res,e); }
});
router.get('/estatus-caso', async (req, res) => {
  try {
    const rows = await CatEstatusCaso.findAll({ order: [['id','ASC']] });
    res.json(rows);
  } catch (e) { sendErr(res,e); }
});

/* ---- POST Catalogos ---- */
router.post('/asuntos', async (req, res) => {
  try {
    const row = await CatAsunto.create(req.body);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});
router.post('/territorios', async (req, res) => {
  try {
    const row = await CatTerritorio.create(req.body);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});
router.post('/impuestos', async (req, res) => {
  try {
    const row = await CatImpuesto.create(req.body);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});
router.post('/autoridades/niveles', async (req, res) => {
  try {
    const row = await CatAutoridadNivel.create(req.body);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});
router.post('/autoridades', async (req, res) => {
  try {
    const row = await Autoridad.create(req.body);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});
router.post('/autoridades/:autoridadId/unidades', async (req, res) => {
  try {
    const data = { ...req.body, autoridadId: req.params.autoridadId };
    const row = await AutoridadUnidad.create(data);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});
router.post('/tipos-documento', async (req, res) => {
  try {
    const row = await CatTipoDocumento.create(req.body);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});
router.post('/estatus-caso', async (req, res) => {
  try {
    const row = await CatEstatusCaso.create(req.body);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});

/* ---- Empleados ---- */
router.get('/empleados', async (req, res) => {
  try {
    const rows = await Empleado.findAll({ where: { activo: 1 }, order: [['nombre','ASC']] });
    res.json(rows);
  } catch (e) { sendErr(res,e); }
});
router.post('/empleados', async (req, res) => {
  try {
    const row = await Empleado.create(req.body);
    res.status(201).json(row);
  } catch (e) { sendErr(res,e); }
});

module.exports = router;
