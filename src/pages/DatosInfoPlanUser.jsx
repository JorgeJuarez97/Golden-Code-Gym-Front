import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";
import clientAxios, { configHeaders } from "../helpers/axios.config";

const DatosInfoPlanUser = () => {
  const [planes, setPlanes] = useState([]);

  const getPlanes = async () => {
    const result = await clientAxios.get("/planesgym", configHeaders);
    setPlanes(result.data);
    console.log(result);
  };

  useEffect(() => {
    getPlanes();
  }, []);

  return (
    <>
      <Container className="margin-top-info-plan-user margin-bottom-info-plan-user-principal">
        {planes.map((plan) => (
          <ListGroup
            className="margin-bottom-info-plan-user-lista"
            key={plan._id}
          >
            <ListGroup.Item variant="warning">
              <strong>{plan.nombrePlan}</strong>
            </ListGroup.Item>
            {plan.infoPlanUser.length > 0 ? (
              plan.infoPlanUser.map((user, index) => (
                <ListGroup.Item key={index} variant="ligth">
                  <strong>Cliente:</strong> {`${user.nombre} ${user.apellido}`}{" "}
                  - <strong>Email:</strong> {user.emailUsuario}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item variant="warning">
                No hay información del cliente.
              </ListGroup.Item>
            )}
          </ListGroup>
        ))}
      </Container>
    </>
  );
};

export default DatosInfoPlanUser;
