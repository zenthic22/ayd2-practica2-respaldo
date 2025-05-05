import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../styles/Temperatura.css"

function Temperatura() {
    const temperaturaSalida = {
        temperatura_aparente: 27,
        unidad: "°C"
    }

    return(
        <Container className="mt-4 temperatura-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center temperatura-card shadow">
                        <Card.Body>
                            <Card.Title className="temperatura-titulo">Temperatura Aparente</Card.Title>
                            <Card.Text className="temperatura-valor">
                                {temperaturaSalida.temperatura_aparente} {temperaturaSalida.unidad}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Temperatura;