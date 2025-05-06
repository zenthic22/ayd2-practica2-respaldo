const temperaturaService = require("../services/temperaturaService");

async function obtenerTemperaturaActual(req, res) {
    try {
        const datos = await temperaturaService.getTemperaturaActual();
        res.json(datos);
    } catch (error) {
        console.error("Error en el controlador (actual):", error.message);
        res.status(500).json({ error: "Error al obtener la temperatura actual" });
    }
}

async function obtenerTemperaturasPorHora(req, res) {
    try {
        const datos = await temperaturaService.getTemperaturasPorHora();
        res.json(datos);
    } catch (error) {
        console.error("Error en el controlador (por hora):", error.message);
        res.status(500).json({ error: "Error al obtener temperaturas por hora" });
    }
}
async function obtenerTemperaturasPorDia(req, res) {
    try {
        const datos = await temperaturaService.getTemperaturasPorDia();
        res.json(datos);
    } catch (error) {
        console.error("Error en el controlador (por día):", error.message);
        res.status(500).json({ error: "Error al obtener temperaturas por día" });
    }
}
module.exports = {
    obtenerTemperaturaActual,
    obtenerTemperaturasPorHora,
    obtenerTemperaturasPorDia
};
