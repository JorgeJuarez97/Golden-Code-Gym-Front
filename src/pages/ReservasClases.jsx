import { Button, Container, ListGroup } from "react-bootstrap";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { useEffect, useState } from "react";

const ReservasClases = () => {
  const [clases, setClases] = useState([]);

  const getClases = async () => {
    const result = await clientAxios.get("/clasesgym", configHeaders);
    setClases(result.data);
  };

  useEffect(() => {
    getClases();
  }, []);

  const eliminarReserva = async (idClase, idUsuario) => {
    try {
      const result = await clientAxios.delete(
        `/clasesgym/eliminarReservarCupoAdmin/${idClase}`,
        {
          ...configHeaders,
          data: { idUsuario },
        }
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
        await getClases();
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };
  return (
    <>
      <Container className="margin-top-info-plan-user margin-bottom-info-plan-user-principal">
        {clases.map((clase) => (
          <ListGroup
            className="margin-bottom-info-plan-user-lista"
            key={clase._id}
          >
            <ListGroup.Item variant="warning">
              <strong>{clase.nombreClase}</strong>
            </ListGroup.Item>
            {clase.usuariosReservados.length > 0 ? (
              clase.usuariosReservados.map((user, index) => (
                <ListGroup.Item key={index} variant="ligth">
                  <strong>Cliente:</strong> {user.nombreUsuario}
                  <Button
                    className="mx-3"
                    variant="danger"
                    onClick={() => eliminarReserva(clase._id, user._id)}
                  >
                    Eliminar Reserva
                  </Button>
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

export default ReservasClases;
