import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../css/Planes.css";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { useEffect, useState } from "react";
import "../css/MarginBottom.css";

const Planes = () => {
  const [planes, setPlanes] = useState([]);

  const getPlanes = async () => {
    const result = await clientAxios.get("/planesgym", configHeaders);
    setPlanes(result.data);
  };

  useEffect(() => {
    getPlanes();
  }, []);

  return (
    <>
      <Container className="titulo-seccion">
        <h1>NUESTROS PLANES</h1>
      </Container>
      <Container className="margin-bottom-planes">
        <Row className="contenedor-plan">
          {planes.map(
            (plan) =>
              !plan.bloqueado && (
                <Col xs={12} md={6} lg={4} className="plan" key={plan._id}>
                  <Card className="plan-card text-center">
                    <Card.Body className="cuerpo-plan">
                      <Card.Title className="titulo-plan">
                        {plan.nombrePlan}
                      </Card.Title>
                      <Card.Text className="descripcion-plan">
                        {plan.acceso}
                      </Card.Text>
                      <div className="precio">
                        <p>
                          <strong>${plan.cuotaMensual}</strong>
                        </p>
                      </div>
                      <Link to={`/paginadetalleplanes/${plan._id}`}>
                        <Button className="boton-plan" variant="warning">
                          Elige este plan
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )}
        </Row>
      </Container>
    </>
  );
};

export default Planes;
