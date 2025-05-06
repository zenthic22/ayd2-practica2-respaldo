const axios = require("axios");

async function getClima() {
    try {
        const latitud = 14.6407;
        const longitud = -90.5133;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=weathercode`;

        const respuesta = await axios.get(url);

        const weathercode = respuesta.data.current.weathercode;

        const descripciones = {
            0: "Despejado",
            1: "Principalmente claro",
            2: "Parcialmente nublado",
            3: "Nublado",
            45: "Niebla",
            48: "Depositando niebla de escarcha",
            51: "Llovizna: Ligera",
            53: "Llovizna: Moderada",
            55: "Llovizna: Intensidad densa",
            56: "Llovizna: Intensidad helada",
            57: "Llovizna: Intensidad densa",
            61: "Lluvia: Intensidad ligera",
            63: "Lluvia: Intensidad moderada",
            65: "Lluvia: Intensidad fuerte",
            66: "Lluvia Helada: Intensidad ligera",
            67: "Lluvia Helada: Intensidad fuerte",
            71: "Nevadas: Intensidad ligera",
            73: "Nevadas: Intensidad moderada",
            75: "Nevadas: Intensidad fuerte",
            77: "Granos de nieve",
            80: "Chubascos de Lluvia: leves",
            81: "Chubascos de Lluvia: moderados",
            82: "Chubascos de Lluvia: fuertes",
            85: "Chubascos de Nieve: ligeros",
            86: "Chubascos de Nieve: fuertes",
            95: "Tormenta: leve",
            95: "Tormenta: moderada",
            96: "Tormenta Electrica con Granizo: ligero",
            99: "Tormenta Electrica con Granizo: fuerte"
        }

        return {
            codigo_clima: weathercode,
            descripcion: descripciones[weathercode] || "Desconocido"
        };

    } catch(error) {
        console.error("Error al obtener datos del clima: ", error.message);
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