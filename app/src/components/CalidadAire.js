// src/components/CalidadAire.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, ListGroup, Spinner, Alert } from "react-bootstrap";
import "../styles/Aire.css";

function CalidadAire() {
  const [actual, setActual] = useState(null);
  const [horario, setHorario] = useState([]);
  const [diario, setDiario]   = useState([]);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(true);

  // Convierte un valor AQI numérico en texto descriptivo
  const categorizarAQI = (aqi) => {
    if (aqi <= 50)   return "Buena";
    if (aqi <= 100)  return "Moderada";
    if (aqi <= 150)  return "Dañina (grupos sensibles)";
    if (aqi <= 200)  return "Dañina";
    if (aqi <= 300)  return "Muy dañina";
    return "Peligrosa";
  };

  useEffect(() => {
    const base = "http://localhost:3002/micro-aire";
    Promise.all([
      axios.get(`${base}/actual`),
      axios.get(`${base}/horario`),
      axios.get(`${base}/diario`)
    ])
    .then(([resActual, resHorario, resDiario]) => {
      setActual(resActual.data);
      setHorario(resHorario.data);
      setDiario(resDiario.data);
    })
    .catch(err => {
      console.error(err);
      setError("No se pudo cargar la calidad del aire");
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Container className="mt-4 text-center">
      <Spinner animation="border" />
    </Container>
  );
  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container className="mt-4 aire-container">
      <Row className="justify-content-center">
        {/* AQI Actual */}
        <Col md={6} className="mb-4">
          <Card className="text-center aire-card shadow">
            <Card.Body>
              <Card.Title className="aire-titulo">Calidad del Aire Actual</Card.Title>
              <h2 className="aire-indice">{actual.aqi} AQI</h2>
              <p className="aire-nivel">
                <strong>Nivel:</strong> {categorizarAQI(actual.aqi)}
              </p>
              <small>Hora de medición: {actual.hora}</small>
            </Card.Body>
          </Card>
        </Col>

        {/* AQI Horario */}
        <Col md={6} className="mb-4">
          <Card className="shadow aire-card">
            <Card.Body>
              <Card.Title className="aire-titulo">Próximas 24 Horas</Card.Title>
              <ListGroup variant="flush" className="aire-lista">
                {horario.map((h, i) => (
                  <ListGroup.Item key={i}>
                    <span className="me-2">{h.hora}</span>
                    <strong>{h.aqi}</strong> AQI → {categorizarAQI(h.aqi)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* AQI Diario */}
        <Col md={6}>
          <Card className="shadow aire-card">
            <Card.Body>
              <Card.Title className="aire-titulo">Promedio Diario</Card.Title>
              <ListGroup variant="flush" className="aire-lista">
                {diario.map((d, i) => (
                  <ListGroup.Item key={i}>
                    <span className="me-2">{d.fecha}</span>
                    <strong>{Math.round(d.aqi)}</strong> AQI → {categorizarAQI(d.aqi)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CalidadAire;