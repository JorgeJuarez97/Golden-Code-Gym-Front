import { Col, Container, Row } from "react-bootstrap";
import "../css/PaginaContacto.css";

const PaginaContacto = () => {
  return (
    <>
      <Container className="contenedor-contacto">
        <Row className="g-4">
          <Col xs={12} md={12} lg={6}>
            <div className="d-flex flex-column align-items-center">
              <h3 className="mb-3 texto-contacto">Nuestra Ubicacion</h3>
              <img
                className="imagen-ubicacion"
                src="https://res.cloudinary.com/dyd8k74ic/image/upload/v1736186382/ubicacionGym_fv0qku.jpg"
                alt="ubicacion gym"
              />
            </div>
          </Col>
          <Col xs={12} md={12} lg={6}>
            <div className="d-flex flex-column align-items-center">
              <h3 className="mb-4 texto-contacto">
                Ponte en contacto con nosotros
              </h3>
              <h4>Direccion:</h4>
              <p className="texto-contacto-info texto-contacto">
                Av. Avellaneda 573
              </p>
              <h4>Mail:</h4>
              <p className="texto-contacto-info texto-contacto">
                goldencodegym@gmail.com
              </p>
              <h4>WhatsApp:</h4>
              <p className="texto-contacto-info texto-contacto">381-666-9333</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaginaContacto;
