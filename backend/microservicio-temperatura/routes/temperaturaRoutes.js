const express = require("express");
const router = express.Router();
const temperaturaController = require("../controllers/temperaturaController");

router.get("/actual", temperaturaController.obtenerTemperaturaActual);
router.get("/por-hora", temperaturaController.obtenerTemperaturasPorHora);
router.get("/por-dia", temperaturaController.obtenerTemperaturasPorDia);

module.exports = router;
