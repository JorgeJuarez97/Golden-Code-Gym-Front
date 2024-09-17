import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../css/Planes.css";

function Planes() {
  return (
    <>
      <Container className="titulo-seccion">
        <h1>NUESTROS PLANES</h1>
      </Container>
      <Container>
        <Row className="contenedor-plan">
          <Col xs={12} md={6} lg={4} className="plan">
            <Card className="plan-card text-center">
              <Card.Body className="cuerpo-plan">
                <Card.Title className="titulo-plan">
                  PLAN MUSCULACION
                </Card.Title>
                <Card.Text className="descripcion-plan">
                  Acceso a zona de musculacion.
                </Card.Text>
                <div className="precio">
                  <p>
                    <strong>$20.000/Mes</strong>
                  </p>
                </div>
                <Button className="boton-plan" variant="warning">
                  Elige este plan
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="plan">
            <Card className="plan-card text-center">
              <Card.Body className="cuerpo-plan">
                <Card.Title className="titulo-plan">PLAN CLASES</Card.Title>
                <Card.Text className="descripcion-plan">
                  Acceso a todas las clases.
                </Card.Text>
                <div className="precio">
                  <p>
                    <strong>$25.000/Mes</strong>
                  </p>
                </div>
                <Button className="boton-plan" variant="warning">
                  Elige este plan
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="plan">
            <Card className="plan-card text-center">
              <Card.Body className="cuerpo-plan">
                <Card.Title className="titulo-plan">PLAN FULL</Card.Title>
                <Card.Text className="descripcion-plan">
                  Acceso a zona de musculacion y a todas las clases.
                </Card.Text>
                <div className="precio">
                  <p>
                    <strong>$40.000/Mes</strong>
                  </p>
                </div>
                <Button className="boton-plan" variant="warning">
                  Elige este plan
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Planes;
