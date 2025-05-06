import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import TemperatureChart from "./TemperaturaChart";
import "../styles/Clima.css"

const descripciones = {
    0: "Despejado",
    1: "Principalmente claro",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Depositando niebla de escarcha",
    51: "Llovizna: Ligera",
    53: "Llovizna: Moderada",
    55: "Llovizna: Intensa",
    56: "Llovizna Helada: Ligera",
    57: "Llovizna Helada: Fuerte",
    61: "Lluvia: Ligera",
    63: "Lluvia: Moderada",
    65: "Lluvia: Fuerte",
    66: "Lluvia Helada: Ligera",
    67: "Lluvia Helada: Fuerte",
    71: "Nevada: Ligera",
    73: "Nevada: Moderada",
    75: "Nevada: Fuerte",
    77: "Granos de nieve",
    80: "Chubascos: Ligeros",
    81: "Chubascos: Moderados",
    82: "Chubascos: Fuertes",
    85: "Chubascos de nieve: Ligeros",
    86: "Chubascos de nieve: Fuertes",
    95: "Tormenta: Leve o moderada",
    96: "Tormenta con granizo: Ligera",
    99: "Tormenta con granizo: Fuerte"
};

function Clima() {
    const [clima, setClima] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/micro-clima/clima")
            .then((res) => {
                setClima(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Error al obtener el clima")
            })
    }, [])

    return (
        <Container className="mt-4 clima-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center clima-card shadow">
                        <Card.Body>
                            <Card.Title className="clima-titulo">Pronóstico Diario</Card.Title>
                            {error && <p className="text-danger">{error}</p>}
                            {clima.length > 0 ? (
                                clima.map((dia, index) => (
                                    <Card.Text key={index} className="clima-texto">
                                        <strong>{dia.fecha}:</strong> {descripciones[dia.codigo_clima] || "Desconocido"} (Código: {dia.codigo_clima})
                                    </Card.Text>
                                ))
                            ) : (
                                <p>Cargando clima...</p>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="shadow p-3">
                        <TemperatureChart/>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Clima;