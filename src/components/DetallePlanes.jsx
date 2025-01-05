import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../css/DetallePlanes.css";
import FormC from "../components/FormC";
import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";

const DetallePlanes = () => {
  const params = useParams();
  const [plan, setPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const obtenerPlan = async () => {
    const result = await clientAxios.get(
      `planesgym/${params.idPlan}`,
      configHeaders
    );
    setPlan(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    obtenerPlan();
  }, []);

  if (isLoading) {
    return <h2>Cargando plan...</h2>;
  }

  return (
    <>
      <Container className="mb-5">
        <h1 className="text-center mt-4 mb-4">{plan.nombrePlan}</h1>
        <p className="descripcion-plan">{plan.descripcion}</p>
        <p className="texto-asesorar">
          Para asesorarte mejor debes llenar este formulario asi nos pondremos
          en contacto contigo para detallarte mas sobre los planes y los medios
          de pago. Muchas gracias por confiar en Golden Code Gym.
        </p>
      </Container>
      <FormC idPage="planes" />
    </>
  );
};

export default DetallePlanes;
