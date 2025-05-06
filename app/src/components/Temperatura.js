import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import TemperatureChart from "./TemperaturaGrafica"; // si tienes una gráfica
import axios from "axios";
import "../styles/Temperatura.css";

function Temperatura() {
    const [temperatura, setTemperatura] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/micro-temperattura/actual")
            .then((res) => {
                setTemperatura(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Error al obtener la temperatura");
            });
    }, []);

    return (
        <Container className="mt-4 temperatura-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center temperatura-card shadow">
                    <Card.Body>
                        <Card.Title className="temperatura-titulo">Temperatura Aparente</Card.Title>
                        {error && <p className="text-danger">{error}</p>}
                        {temperatura ? (
                            <>
                                <h2 className="temperatura-valor">
                                    🌡️ {temperatura.temperatura_actual} °C
                                </h2>
                                <p style={{ marginTop: '10px', fontSize: '1rem', color: '#555' }}>
                                    Temperatura actual registrada
                                </p>
                            </>
                        ) : (
                            <p>Cargando temperatura...</p>
                        )}
                    </Card.Body>

                    </Card>
                    <Card className="shadow p-3">
                        <TemperatureChart /> {/* Gráfica opcional */}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Temperatura;
