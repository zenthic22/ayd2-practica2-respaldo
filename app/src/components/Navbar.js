import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"

function NavigationBar() {
    return(
        <Navbar className="custom-navbar" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">ClimaGT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/clima">Clima</Nav.Link>
                        <Nav.Link as={Link} to="/temperatura">Temperatura</Nav.Link>
                        <Nav.Link as={Link} to="/aire">Calidad del Aire</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;