import { Col, Container, Row } from "react-bootstrap";
import "../assets/imagenes/ubicacionGym.jpg";
import FormC from "../components/FormC";
import "../css/PaginaContacto.css";

const PaginaContacto = () => {
  return (
    <>
      <Container className="contenedor-contacto">
        <Row className="g-4">
          <Col xs={12} md={12} lg={6}>
            <div className="d-flex flex-column align-items-center">
              <h4 className="mb-3 texto-contacto">Nuestra Ubicacion</h4>
              <img
                className="imagen-ubicacion"
                src="src\assets\imagenes\ubicacionGym.jpg"
                alt="ubicacion gym"
              />
            </div>
          </Col>
          <Col xs={12} md={12} lg={6}>
            <div className="d-flex flex-column align-items-center">
              <h4 className="mb-4 texto-contacto">
                Ponte en contacto con nosotros
              </h4>
              <FormC idPage="contacto" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaginaContacto;
