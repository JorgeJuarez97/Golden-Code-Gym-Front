import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { Container } from "react-bootstrap";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";

const Suplementos = ({ setShowModalLogin, setCantidadTotal }) => {
  const [suplementos, setSuplementos] = useState([]);

  const getSuplementos = async () => {
    const products = await clientAxios.get(
      "/productosgym/tipo/suplementos",
      configHeaders
    );
    setSuplementos(products.data);
  };

  useEffect(() => {
    getSuplementos();
  }, []);

  return (
    <>
      <Container className="margin-top-productos margin-bottom-productos">
        <CardProductos
          idPage="suplementos"
          suplementos={suplementos}
          setShowModalLogin={setShowModalLogin}
          setCantidadTotal={setCantidadTotal}
        />
      </Container>
    </>
  );
};
export default Suplementos;
