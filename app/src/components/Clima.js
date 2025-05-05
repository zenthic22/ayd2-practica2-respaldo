import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../styles/Clima.css"

function Clima() {
    const climaSimulado = {
        codigo: 2,
        descripcion: "Parcialmente nublado",
    }

    return (
        <Container className="mt-4 clima-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center clima-card shadow">
                        <Card.Body>
                            <Card.Title className="clima-titulo">Clima Actual</Card.Title>
                            <Card.Text className="clima-texto">
                                <strong>Descripcion:</strong> {climaSimulado.descripcion}
                            </Card.Text>
                            <Card.Text className="clima-texto">
                                <strong>Codigo:</strong> {climaSimulado.codigo}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Clima;