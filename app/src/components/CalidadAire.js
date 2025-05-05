import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../styles/Aire.css"

function CalidadAire() {
    const aqiSimulado = {
        indice: 58,
        calidad: "Moderada"
    }

    return (
        <Container className="mt-4 aire-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center aire-card shadow">
                        <Card.Body>
                            <Card.Title className="aire-titulo">Calidad del Aire</Card.Title>
                            <Card.Text className="aire-indice">
                                Indice: {aqiSimulado.indice}
                            </Card.Text>
                            <Card.Text className="aire-nivel">
                                <strong>Nivel:</strong> {aqiSimulado.calidad}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CalidadAire;