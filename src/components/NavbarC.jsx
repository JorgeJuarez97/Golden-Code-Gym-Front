import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/NavbarC.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalLogin from "./ModalLogin";
import { LinkContainer } from "react-router-bootstrap";

const NavbarC = ({ setShowModalLogin, showModalLogin }) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const rol = JSON.parse(sessionStorage.getItem("rol")) || "";

  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

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
          <LinkContainer
            to={token && rol === "admin" ? "/paneladministrador" : "/"}
          >
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
                to={token && rol === "admin" ? "/paneladministrador" : "/"}
              >
                Inicio
              </NavLink>
              {token && rol === "admin" ? (
                <NavDropdown title="Listas" id="basic-nav-dropdown">
                  <LinkContainer
                    to="/listaproductossuplementos"
                    className="drop-lista"
                  >
                    <NavDropdown.Item>Suplementos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    to="/listaproductosindumentarias"
                    className="drop-lista"
                  >
                    <NavDropdown.Item>Indumentaria Deportiva</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/listaclases" className="drop-lista">
                    <NavDropdown.Item>Clases</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/listausuarios" className="drop-lista">
                    <NavDropdown.Item>Usuarios</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/listaprofes" className="drop-lista">
                    <NavDropdown.Item>Profesores</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <>
                  <NavLink
                    className="link-navbar nav-link"
                    to="/paginacontacto"
                  >
                    Contacto
                  </NavLink>
                  <NavLink
                    className="link-navbar nav-link"
                    to="/paginasobrenosotros"
                  >
                    Sobre Nosotros
                  </NavLink>
                  <NavLink className="link-navbar nav-link" to="/clases">
                    Clases
                  </NavLink>
                  <NavDropdown title="Productos" id="basic-nav-dropdown">
                    <LinkContainer to="/suplementos" className="drop-lista">
                      <NavDropdown.Item>Suplementos</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/indumentarias" className="drop-lista">
                      <NavDropdown.Item>
                        Indumentaria Deportiva
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              )}
            </Nav>
            {token ? (
              <Nav className="ms-auto align-items-center">
                <NavLink
                  className="link-navbar nav-link"
                  to="#"
                  onClick={cerrarSesion}
                >
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
          {token && rol === "admin" ? (
            ""
          ) : (
            <NavLink
              className={`link-navbar nav-link contenedor-icono-carrito ${
                abierto || menuAbierto ? "ms-auto" : ""
              }`}
              to="/carrito"
            >
              <i className="bi bi-cart-fill icono-carrito"></i>
              <span className="contador-carrito">{totalItems}</span>
            </NavLink>
          )}
        </Container>
      </Navbar>
      <ModalLogin
        show={showModalLogin}
        handleClose={handleClose}
        setShowModalLogin={setShowModalLogin}
      />
    </>
  );
};

export default NavbarC;
