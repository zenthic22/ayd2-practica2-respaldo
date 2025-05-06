const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/aireController");

// GET /micro-aire/actual   → AQI actual
router.get("/actual", ctrl.obtenerAQIActual);

// GET /micro-aire/horario  → próximo 24 horas
router.get("/horario", ctrl.obtenerAQIPorHora);

// GET /micro-aire/diario   → promedio diario
router.get("/diario", ctrl.obtenerAQIPorDia);

module.exports = router;

