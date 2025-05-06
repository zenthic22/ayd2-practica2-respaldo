const aireService = require("../services/aireService");

async function obtenerAQIActual(req, res) {
  const datos = await aireService.getCalidadAireActual();
  if (!datos) return res.status(500).json({ error: "No se pudo obtener AQI actual" });
  res.json(datos);
}

async function obtenerAQIPorHora(req, res) {
  const datos = await aireService.getCalidadAirePorHora();
  res.json(datos);
}

async function obtenerAQIPorDia(req, res) {
  const datos = await aireService.getCalidadAirePorDia();
  res.json(datos);
}

module.exports = {
  obtenerAQIActual,
  obtenerAQIPorHora,
  obtenerAQIPorDia
};

