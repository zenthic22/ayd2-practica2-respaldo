const axios = require("axios");

const LAT = 14.6407;
const LON = -90.5133;
const BASE_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";
const TZ = "auto";

// 1. Calidad actual (current)
async function getCalidadAireActual() {
  try {
    const url = `${BASE_URL}?latitude=${LAT}&longitude=${LON}&current=us_aqi&timezone=${TZ}`;
    const { data } = await axios.get(url);
    const time = data.current.time;             // e.g. "2025-05-06T14:00"
    const aqi  = data.current.us_aqi;           // valor numérico
    return {
      hora: time.split("T")[1],
      aqi
    };
  } catch (error) {
    console.error("Error al obtener AQI actual:", error.message);
    return null;
  }
}

// 2. Calidad por hora (hourly)
async function getCalidadAirePorHora() {
  try {
    const url = `${BASE_URL}?latitude=${LAT}&longitude=${LON}&hourly=us_aqi&timezone=${TZ}`;
    const { data } = await axios.get(url);
    const times = data.hourly.time;      // ["2025-05-06T00:00", ...]
    const values = data.hourly.us_aqi;   // [ 12, ... ]
    // devolvemos las próximas 24 horas
    return times.slice(0, 24).map((t, i) => ({
      hora: t.split("T")[1],
      aqi: values[i]
    }));
  } catch (error) {
    console.error("Error al obtener AQI horario:", error.message);
    return [];
  }
}

// 3. Calidad por día (daily avg de hourly)
async function getCalidadAirePorDia() {
  try {
    const url = `${BASE_URL}?latitude=${LAT}&longitude=${LON}&hourly=us_aqi&timezone=${TZ}`;
    const { data } = await axios.get(url);
    const times = data.hourly.time;
    const values = data.hourly.us_aqi;

    // agrupar por fecha
    const agrupado = times.reduce((acc, t, i) => {
      const fecha = t.split("T")[0];
      acc[fecha] = acc[fecha] || [];
      acc[fecha].push(values[i]);
      return acc;
    }, {});

    // calcular promedio diario
    return Object.entries(agrupado).map(([fecha, arr]) => ({
      fecha,
      aqi: arr.reduce((sum, v) => sum + v, 0) / arr.length
    }));
  } catch (error) {
    console.error("Error al obtener AQI diario:", error.message);
    return [];
  }
}

module.exports = {
  getCalidadAireActual,
  getCalidadAirePorHora,
  getCalidadAirePorDia
};

