const express = require("express");
const router = express.Router();
const climaController = require("../controllers/climaController");

router.get("/clima", climaController.obtenerClima);
router.get("/temperaturas", climaController.obtenerTemperaturasPorHora);

module.exports = router;