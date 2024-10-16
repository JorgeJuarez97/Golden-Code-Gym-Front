import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/NavbarC.css";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalLogin from "./ModalLogin";
import { LinkContainer } from "react-router-bootstrap";

const NavbarC = () => {
  const location = useLocation();
  const isAdminPage =
    location.pathname === "/paneladministrador" ||
    location.pathname === "/listaproductos/suplementos" ||
    location.pathname === "/listaproductos/indumentarias";

  const [showModalLogin, setShowModalLogin] = useState(false);

  const handleShow = () => setShowModalLogin(true);
  const handleClose = () => setShowModalLogin(false);

  const [abierto, setAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleToggle = () => {
    setAbierto(!abierto);
  };

  const handleEnter = () => {
    setMenuAbierto(true);
  };

  const handleExited = () => {
    setMenuAbierto(false);
  };

  const [totalItems, setTotalItems] = useState(0);

  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    setTotalItems(total);
  };

  useEffect(() => {
    actualizarContadorCarrito();

    window.addEventListener("storage", actualizarContadorCarrito);

    return () => {
      window.removeEventListener("storage", actualizarContadorCarrito);
    };
  }, []);

  return (
    <>
      <Navbar expand="md" className="navbar-gym">
        <Container fluid>
          <LinkContainer to={isAdminPage ? "/paneladministrador" : "/"}>
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
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            in={abierto}
            onEntered={handleEnter}
            onExited={handleExited}
          >
            <Nav className="me-auto align-items-center">
              <NavLink
                className="link-navbar nav-link"
                to={isAdminPage ? "/paneladministrador" : "/"}
              >
                Inicio
              </NavLink>
              <NavLink className="link-navbar nav-link" to="/paginacontacto">
                Contacto
              </NavLink>
              <NavLink className="link-navbar nav-link" to="#link">
                Sobre Nosotros
              </NavLink>
              <NavLink className="link-navbar nav-link" to="/clases">
                Clases
              </NavLink>
              {isAdminPage ? (
                <NavDropdown title="Listas" id="basic-nav-dropdown">
                  <LinkContainer
                    to="/listaproductos/suplementos"
                    className="drop-lista"
                  >
                    <NavDropdown.Item>Suplementos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    to="/listaproductos/indumentarias"
                    className="drop-lista"
                  >
                    <NavDropdown.Item>Indumentaria Deportiva</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <NavDropdown title="Productos" id="basic-nav-dropdown">
                  <LinkContainer to="/suplementos" className="drop-lista">
                    <NavDropdown.Item>Suplementos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/indumentarias" className="drop-lista">
                    <NavDropdown.Item>Indumentaria Deportiva</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            {isAdminPage ? (
              <Nav className="ms-auto align-items-center">
                <NavLink className="link-navbar nav-link" to="/">
                  Cerrar Sesion
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto align-items-center">
                <NavLink className="link-navbar nav-link" onClick={handleShow}>
                  Iniciar Sesion
                </NavLink>
                <NavLink className="link-navbar nav-link" to="/registro">
                  Registrarse
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
          <NavLink
            className={`link-navbar nav-link contenedor-icono-carrito ${
              abierto || menuAbierto ? "ms-auto" : ""
            }`}
            to="/carrito"
          >
            <i className="bi bi-cart-fill icono-carrito"></i>
            <span className="contador-carrito">{totalItems}</span>
          </NavLink>
        </Container>
      </Navbar>
      <ModalLogin show={showModalLogin} handleClose={handleClose} />
    </>
  );
};

export default NavbarC;
