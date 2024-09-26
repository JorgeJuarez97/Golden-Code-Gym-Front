import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/NavbarC.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ModalLogin from "./ModalLogin";
import { LinkContainer } from "react-router-bootstrap";

const NavbarC = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);

  const handleShow = () => setShowModalLogin(true);
  const handleClose = () => setShowModalLogin(false);
  return (
    <>
      <Navbar expand="md" className="navbar-gym">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={
                  "https://seeklogo.com/images/G/golds-gym-round-logo-5D0D94D43D-seeklogo.com.png"
                }
                alt="Logo"
                style={{ height: "80px", width: "auto" }}
              />
            </Navbar.Brand>
          </LinkContainer>
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
              <NavLink className="link-navbar nav-link" to="/clases">
                Clases
              </NavLink>
              <NavDropdown title="Productos" id="basic-nav-dropdown">
                <LinkContainer to="/suplementos" className="drop-lista">
                  <NavDropdown.Item>Suplementos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/indumentaria" className="drop-lista">
                  <NavDropdown.Item>Indumentaria Deportiva</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto align-items-center">
              <NavLink className="link-navbar nav-link" onClick={handleShow}>
                Iniciar Sesion
              </NavLink>
              <NavLink className="link-navbar nav-link" to="/registro">
                Registrarse
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalLogin show={showModalLogin} handleClose={handleClose} />
    </>
  );
};

export default NavbarC;
