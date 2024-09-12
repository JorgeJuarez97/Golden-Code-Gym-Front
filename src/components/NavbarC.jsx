import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/NavbarC.css";

const NavbarC = () => {
  return (
    <>
      <Navbar expand="md" className="navbar-gym">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src={
                "https://seeklogo.com/images/G/golds-gym-round-logo-5D0D94D43D-seeklogo.com.png"
              }
              alt="Logo"
              style={{ height: "80px", width: "auto" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center">
              <Nav.Link className="link-navbar" href="#home">
                Inicio
              </Nav.Link>
              <Nav.Link className="link-navbar" href="#link">
                Contacto
              </Nav.Link>
              <Nav.Link className="link-navbar" href="#link">
                Sobre Nosotros
              </Nav.Link>
              <Nav.Link className="link-navbar" href="#link">
                Clases
              </Nav.Link>
              <NavDropdown title="Productos" id="basic-nav-dropdown">
                <NavDropdown.Item className="drop-lista" href="#action/3.1">
                  Multivitaminicos
                </NavDropdown.Item>
                <NavDropdown.Item className="drop-lista" href="#action/3.2">
                  Proteinas
                </NavDropdown.Item>
                <NavDropdown.Item className="drop-lista" href="#action/3.3">
                  Creatinas
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto align-items-center">
              <Nav.Link className="link-navbar" href="#link">
                Iniciar Sesion
              </Nav.Link>
              <Nav.Link className="link-navbar" href="#link">
                Registrarse
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
