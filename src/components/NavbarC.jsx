import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/NavbarC.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalLogin from "./ModalLogin";
import { LinkContainer } from "react-router-bootstrap";
import ApiClima from "./ApiClima";
import clientAxios, { configHeaders } from "../helpers/axios.config";

const NavbarC = ({
  setShowModalLogin,
  showModalLogin,
  cantidadTotal,
  setCantidadTotal,
}) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const rol = JSON.parse(sessionStorage.getItem("rol")) || "";

  const cerrarSesion = async () => {
    if (rol === "user") {
      const result = await clientAxios.get(
        "/productosgym/obtenerProductosCarrito",
        configHeaders
      );

      const carrito = result.data.productos;

      if (carrito.length > 0) {
        const confirmarEliminar = confirm(
          "¿Estás seguro que deseas eliminar todos los productos del carrito antes de cerrar sesión?"
        );
        if (confirmarEliminar) {
          for (const producto of carrito) {
            try {
              const result = await clientAxios.delete(
                `/productosgym/eliminarProductoCarrito/${producto._id}`,
                configHeaders
              );
            } catch (error) {
              alert(
                `Error eliminando producto: ${
                  error.response?.data?.msg || error.message
                }`
              );
            }
          }
          setCantidadTotal(0);
          alert("Productos eliminados del carrito");
        }
      }
    }

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

  return (
    <>
      <Navbar expand="md" className="navbar-gym fixed-top">
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
                onClick={() => setAbierto(false)}
                to={token && rol === "admin" ? "/paneladministrador" : "/"}
              >
                Inicio
              </NavLink>
              {token && rol === "admin" ? (
                <>
                  <NavDropdown title="Listas" id="basic-nav-dropdown">
                    <LinkContainer
                      to="/listaproductossuplementos"
                      className="drop-lista"
                      onClick={() => setAbierto(false)}
                    >
                      <NavDropdown.Item>Suplementos</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      to="/listaproductosindumentarias"
                      className="drop-lista"
                      onClick={() => setAbierto(false)}
                    >
                      <NavDropdown.Item>
                        Indumentaria Deportiva
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      to="/listaclases"
                      className="drop-lista"
                      onClick={() => setAbierto(false)}
                    >
                      <NavDropdown.Item>Clases</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      to="/listausuarios"
                      className="drop-lista"
                      onClick={() => setAbierto(false)}
                    >
                      <NavDropdown.Item>Usuarios</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      to="/listaprofes"
                      className="drop-lista"
                      onClick={() => setAbierto(false)}
                    >
                      <NavDropdown.Item>Profesores</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      to="/listaplanes"
                      className="drop-lista"
                      onClick={() => setAbierto(false)}
                    >
                      <NavDropdown.Item>Planes</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavLink
                    className="link-navbar nav-link"
                    to="/datosinfoplanuser"
                    onClick={() => setAbierto(false)}
                  >
                    Usuarios InfoPlanes
                  </NavLink>
                  <NavLink
                    className="link-navbar nav-link"
                    to="/reservasclases"
                    onClick={() => setAbierto(false)}
                  >
                    Reservas de Clases
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="link-navbar nav-link"
                    to="/paginacontacto"
                    onClick={() => setAbierto(false)}
                  >
                    Contacto
                  </NavLink>
                  <NavLink
                    className="link-navbar nav-link"
                    to="/paginasobrenosotros"
                    onClick={() => setAbierto(false)}
                  >
                    Sobre Nosotros
                  </NavLink>
                  <NavLink
                    className="link-navbar nav-link"
                    to="/clases"
                    onClick={() => setAbierto(false)}
                  >
                    Clases
                  </NavLink>
                  <NavDropdown title="Productos" id="basic-nav-dropdown">
                    <LinkContainer
                      to="/suplementos"
                      className="drop-lista"
                      onClick={() => setAbierto(false)}
                    >
                      <NavDropdown.Item>Suplementos</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      to="/indumentarias"
                      className="drop-lista"
                      onClick={() => setAbierto(false)}
                    >
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
                  onClick={() => {
                    cerrarSesion();
                    setAbierto(false);
                  }}
                >
                  Cerrar Sesion
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto align-items-center">
                <NavLink
                  className="link-navbar nav-link"
                  onClick={() => {
                    handleShow();
                    setAbierto(false);
                  }}
                >
                  Iniciar Sesion
                </NavLink>
                <NavLink
                  className="link-navbar nav-link"
                  to="/registro"
                  onClick={() => setAbierto(false)}
                >
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
              <span className="contador-carrito">{cantidadTotal}</span>
            </NavLink>
          )}
        </Container>
        <Container>
          <ApiClima />
        </Container>
      </Navbar>
      <ModalLogin
        show={showModalLogin}
        handleCloseLogin={handleClose}
        setShowModalLogin={setShowModalLogin}
      />
    </>
  );
};

export default NavbarC;
