import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/Planes.css";
import TextoExpandido from "./TextoExpandido";
import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import { useState } from "react";
import "../css/Infogym.css";

const CardProductos = ({
  idPage,
  suplementos,
  indumentarias,
  clases,
  profes,
  setShowModalLogin,
}) => {
  const agregarAlCarrito = () => {
    const token = JSON.parse(sessionStorage.getItem("token")) || "";

    if (!token) {
      alert("Debes iniciar sesion para agregar el producto al carrito");
      setShowModalLogin(true);
    }
  };

  const [showModalReserva, setShowModalReserva] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleShow = (clase) => {
    setSelectedClass(clase);
    setShowModalReserva(true);
  };
  const handleClose = () => setShowModalReserva(false);

  return (
    <>
      <Container>
        <Row className="contenedor-plan">
          {idPage === "suplementos" &&
            suplementos.map(
              (suplemento) =>
                !suplemento.bloqueado && (
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                    className="plan"
                    key={suplemento._id}
                  >
                    <Card className="producto">
                      <Link
                        to={`/detalleproducto/suplementos/${suplemento._id}`}
                      >
                        <Card.Img
                          className="imagen-producto"
                          variant="top"
                          src={suplemento.imagen}
                        />
                      </Link>
                      <Card.Body className="cuerpo-producto">
                        <Card.Title className="titulo-plan titulo-producto">
                          {suplemento.nombreProducto}
                        </Card.Title>
                        <Card.Text className="precio-producto">
                          ${suplemento.precio}
                        </Card.Text>
                        <div className="boton-añadir-carrito">
                          <Button
                            className="boton-plan"
                            variant="warning"
                            onClick={() => agregarAlCarrito(suplemento)}
                          >
                            Añadir al Carrito
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
            )}
          {idPage === "indumentarias" &&
            indumentarias.map(
              (indumentaria) =>
                !indumentaria.bloqueado && (
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                    className="plan"
                    key={indumentaria._id}
                  >
                    <Card className="producto">
                      <Link
                        to={`/detalleproducto/indumentarias/${indumentaria._id}`}
                      >
                        <Card.Img
                          className="imagen-producto"
                          variant="top"
                          src={indumentaria.imagen}
                        />
                      </Link>
                      <Card.Body className="cuerpo-producto">
                        <Card.Title className="titulo-plan titulo-producto">
                          {indumentaria.nombreProducto}
                        </Card.Title>
                        <Card.Text className="precio-producto">
                          ${indumentaria.precio}
                        </Card.Text>
                        <div className="boton-añadir-carrito">
                          <Button
                            className="boton-plan"
                            variant="warning"
                            onClick={() => agregarAlCarrito(indumentaria)}
                          >
                            Añadir al Carrito
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
            )}
          {idPage === "clases" &&
            clases.map(
              (clase) =>
                !clase.bloqueado && (
                  <Col xs={12} md={6} lg={4} className="plan" key={clase._id}>
                    <Card className="clase">
                      <Card.Img
                        className="imagen-clase"
                        variant="top"
                        src={clase.imagen}
                      />
                      <Card.Body className="cuerpo-producto">
                        <Card.Title className="titulo-plan titulo-producto">
                          {clase.nombreClase}
                        </Card.Title>
                        <Card.Text as="div">
                          <TextoExpandido
                            texto={clase.descripcionClase}
                            maxLength={30}
                          />
                        </Card.Text>
                        <div className="boton-añadir-carrito">
                          <Button
                            className="boton-plan"
                            variant="warning"
                            onClick={handleShow}
                          >
                            Reservar Cupo
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
            )}
          {idPage === "profes" &&
            profes.map(
              (profe) =>
                !profe.bloqueado && (
                  <Col xs={12} md={6} lg={4} className="info" key={profe._id}>
                    <Card className="info-cuerpo">
                      <Card.Img
                        className="imagen-profe"
                        variant="top"
                        src={profe.imagen}
                      />
                      <Card.Body className="cuerpo-producto">
                        <Card.Title className="texto-card">
                          {profe.nombreProfe}
                        </Card.Title>
                        <Card.Text className="texto-card">
                          <strong>Clase:</strong> {profe.clase}
                        </Card.Text>
                        <Card.Text className="texto-card">
                          <strong>Zona de Musculación:</strong>{" "}
                          {profe.zonaDeMusculacion}
                        </Card.Text>
                        <Card.Text className="texto-card" as="div">
                          <strong>Reseña Academica:</strong>
                          <TextoExpandido
                            texto={profe.reseñaAcademica}
                            maxLength={30}
                          />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                )
            )}
        </Row>
      </Container>
      <ModalLogin
        show={showModalReserva}
        handleClose={handleClose}
        selectedClass={selectedClass}
      />
    </>
  );
};

export default CardProductos;
