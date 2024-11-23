import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/Planes.css";
import TextoExpandido from "./TextoExpandido";
import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import { useState } from "react";
import { useEffect } from "react";

const CardProductos = ({ idPage }) => {
  const [suplementos, setSuplementos] = useState([]);

  const getSuplementos = async () => {
    const products = await fetch(
      "http://localhost:3001/productosgym/suplementos"
    );
    const data = await products.json();
    setSuplementos(data);
  };

  useEffect(() => {
    getSuplementos();
  }, []);

  const [indumentarias, setIndumentarias] = useState([]);

  const getIndumentarias = async () => {
    const products = await fetch(
      "http://localhost:3001/productosgym/indumentarias"
    );
    const data = await products.json();
    setIndumentarias(data);
  };

  useEffect(() => {
    getIndumentarias();
  }, []);

  const agregarAlCarrito = (producto, tipo) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carritoActual.find(
      (p) => p.id === producto.id && p.tipo === tipo
    );

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoActual.push({
        ...producto,
        tipo,
        cantidad: 1,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    alert("Producto agregado al carrito");
    window.dispatchEvent(new Event("storage"));
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
            suplementos.map((suplemento) => (
              <Col xs={12} md={6} lg={4} className="plan" key={suplemento._id}>
                <Card className="info-cuerpo producto">
                  <Link to={`/detalleproducto/suplementos/${suplemento._id}`}>
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
                        onClick={() =>
                          agregarAlCarrito(suplemento, "suplementos")
                        }
                      >
                        Añadir al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          {idPage === "indumentarias" &&
            indumentarias.map((indumentaria) => (
              <Col
                xs={12}
                md={6}
                lg={4}
                className="plan"
                key={indumentaria._id}
              >
                <Card className="info-cuerpo producto">
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
                        onClick={() =>
                          agregarAlCarrito(indumentaria, "indumentarias")
                        }
                      >
                        Añadir al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          {idPage === "clases" &&
            clases.map((clase) => (
              <Col xs={12} md={6} lg={4} className="plan" key={clase.id}>
                <Card className="info-cuerpo clase">
                  <Card.Img
                    className="imagen-clase"
                    variant="top"
                    src={clase.imagen}
                  />
                  <Card.Body className="cuerpo-producto">
                    <Card.Title className="titulo-plan titulo-producto">
                      {clase.nombre}
                    </Card.Title>
                    <Card.Text>
                      <TextoExpandido
                        texto={clase.descripcion}
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
            ))}
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
