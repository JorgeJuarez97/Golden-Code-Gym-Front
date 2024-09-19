import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/NavbarC.css";
import { NavLink } from "react-router-dom";

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
              <NavLink className="link-navbar nav-link" to="/">
                Inicio
              </NavLink>
              <NavLink className="link-navbar nav-link" to="#link">
                Contacto
              </NavLink>
              <NavLink className="link-navbar nav-link" to="#link">
                Sobre Nosotros
              </NavLink>
              <NavLink className="link-navbar nav-link" to="#link">
                Clases
              </NavLink>
              <NavDropdown title="Productos" id="basic-nav-dropdown">
                <NavLink to="#" className="link-drop">
                  <NavDropdown.Item className="drop-lista">
                    Suplementos
                  </NavDropdown.Item>
                </NavLink>
                <NavLink to="#" className="link-drop">
                  <NavDropdown.Item className="drop-lista">
                    Indumentaria Deportiva
                  </NavDropdown.Item>
                </NavLink>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto align-items-center">
              <NavLink className="link-navbar nav-link" to="#link">
                Iniciar Sesion
              </NavLink>
              <NavLink className="link-navbar nav-link" to="#link">
                Registrarse
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
