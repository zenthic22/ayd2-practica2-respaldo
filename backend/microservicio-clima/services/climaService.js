const axios = require("axios");

async function getClima() {
    try {
        const latitud = 14.6407;
        const longitud = -90.5133;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&daily=weather_code&timezone=auto`;

        const respuesta = await axios.get(url);
        const codigos = respuesta.data.daily.weather_code;
        const fechas = respuesta.data.daily.time;

        const climaPorDia = fechas.map((fecha, index) => ({
            fecha,
            codigo_clima: codigos[index]
        }));

        return climaPorDia;

    } catch(error) {
        console.error("Error al obtener datos del clima: ", error.message);
        return [];
    }
}

async function getTemperaturasPorHora() {
    try {
        const latitud = 14.6407;
        const longitud = -90.5133;

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

        return datos.slice(0, 12);
    } catch(error) {
        console.error("Error al obtener temperaturas por hora: ", error.message);
        return [];
    }
}

module.exports = { 
    getClima,
    getTemperaturasPorHora
};