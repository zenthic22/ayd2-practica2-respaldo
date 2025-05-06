const climaService = require("../services/climaService");

async function obtenerClima(req, res) {
    try {
        const datos = await climaService.getClima();
        res.json(datos);
    } catch(error) {
        console.error("Error en el controlador: ", error.message);
        res.status(500).json({ error: "Error al obtener el clima" })
    }
}

async function obtenerTemperaturasPorHora(req, res) {
    try {
        const datos = await climaService.getTemperaturasPorHora();
        res.json(datos);
    } catch(error) {
        console.error("Error al obtener temperaturas por hora: ", error.message);
        res.status(500).json({ error: "Error al obtener datos de temperatura horaria" });
    }
}

module.exports = { 
    obtenerClima,
    obtenerTemperaturasPorHora
};