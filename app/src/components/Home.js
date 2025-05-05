import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import icon from "../assets/clima.png";
import "../styles/Home.css"

function Home() {
    return(
        <Container className="home-container mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="text-center home-card shadow">
                        <Card.Body>
                            <Card.Title className="home-title">
                                <img src={icon} /> Bienvenido a ClimaGT
                            </Card.Title>
                            <Card.Text className="home-text">
                                Consulte el clima actual, temperatura y calidad del aire en Ciudad de Guatemala.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;