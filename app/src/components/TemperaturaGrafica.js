// src/components/TemperatureChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

function TemperatureChart() {
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/micro-temperattura/por-dia")
            .then((res) => {
                console.log("Datos recibidos:", res.data);
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setData(res.data);
                    setCargando(false);
                } else {
                    setError("Datos de temperatura no válidos");
                    setCargando(false);
                }
            })
            .catch((err) => {
                console.error("Error al obtener temperaturas:", err.message);
                setError("No se pudo cargar la gráfica de temperaturas");
                setCargando(false);
            });
    }, []);

    if (cargando) return <p>Cargando gráfica de temperatura...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ width: "100%", height: 400 }}>
            <h4 style={{ textAlign: "center" }}>Temperatura por Día (últimos 7 días)</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis unit="°C" />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperatura" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TemperatureChart;
