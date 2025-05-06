import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import TemperatureChart from "./TemperaturaChart";
import "../styles/Clima.css"

function Clima() {
    const [clima, setClima] = useState(null);
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
                            <Card.Title className="clima-titulo">Clima Actual</Card.Title>
                            {error && <p className="text-danger">{error}</p>}
                            {clima ? (
                                <>
                                    <Card.Text className="clima-texto">
                                        <strong>Descripcion:</strong> {clima.descripcion}
                                    </Card.Text>
                                    <Card.Text className="clima-texto">
                                        <strong>Codigo:</strong> {clima.codigo_clima}
                                    </Card.Text>
                                </>
                            ): (
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