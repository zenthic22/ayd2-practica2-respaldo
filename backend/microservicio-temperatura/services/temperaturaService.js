const axios = require("axios");

const latitud = 14.6407;
const longitud = -90.5133;

async function getTemperaturaActual() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m&timezone=auto`;

        const respuesta = await axios.get(url);
        return {
            temperatura_actual: respuesta.data.current.temperature_2m
        };
    } catch (error) {
        console.error("Error al obtener temperatura actual:", error.message);
        return null;
    }
}

async function getTemperaturasPorHora() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m&timezone=auto`;

        const respuesta = await axios.get(url);

        const horas = respuesta.data.hourly.time;
        const temperaturas = respuesta.data.hourly.temperature_2m;

        const datos = horas.map((hora, index) => {
            const horaFormateada = hora.split("T")[1];
            return {
                hora: horaFormateada,
                temperatura: temperaturas[index]
            };
        });

        return datos.slice(0, 12); // puedes ajustar esto si quieres más/menos horas
    } catch (error) {
        console.error("Error al obtener temperaturas por hora:", error.message);
        return [];
    }
}
async function getTemperaturasPorDia() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&daily=temperature_2m_max&timezone=auto`;

        const respuesta = await axios.get(url);

        const fechas = respuesta.data.daily.time;
        const temperaturasMax = respuesta.data.daily.temperature_2m_max;

        const datos = fechas.map((fecha, index) => ({
            fecha, // formato: YYYY-MM-DD
            temperatura: temperaturasMax[index]
        }));

        return datos.slice(0, 7); // solo los últimos 7 días
    } catch (error) {
        console.error("Error al obtener temperaturas por día:", error.message);
        return [];
    }
}


module.exports = {
    getTemperaturaActual,
    getTemperaturasPorHora,
    getTemperaturasPorDia
};
