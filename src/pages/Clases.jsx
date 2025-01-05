import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import "../css/MarginTop.css";
import { Container } from "react-bootstrap";
import "../css/MarginBottom.css";

const Clases = ({ setShowModalLogin }) => {
  const [clases, setClases] = useState([]);

  const getClases = async () => {
    const products = await clientAxios.get("/clasesgym", configHeaders);
    setClases(products.data);
  };

  useEffect(() => {
    getClases();
  }, []);
  return (
    <>
      <Container className="margin-top-clases margin-bottom-clases">
        <h1 className="text-center">Bienvenido a nuestras clases</h1>
        <CardProductos
          idPage="clases"
          clases={clases}
          getClases={getClases}
          setShowModalLogin={setShowModalLogin}
        />
      </Container>
    </>
  );
};

export default Clases;
