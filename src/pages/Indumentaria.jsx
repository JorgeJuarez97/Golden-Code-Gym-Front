import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { Container } from "react-bootstrap";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";

const Indumentaria = ({ setShowModalLogin, setCantidadTotal }) => {
  const [indumentarias, setIndumentarias] = useState([]);

  const getIndumentarias = async () => {
    const products = await clientAxios.get(
      "/productosgym/tipo/indumentarias",
      configHeaders
    );
    setIndumentarias(products.data);
  };

  useEffect(() => {
    getIndumentarias();
  }, []);
  return (
    <>
      <Container className="margin-top-productos margin-bottom-productos">
        <CardProductos
          idPage="indumentarias"
          indumentarias={indumentarias}
          setShowModalLogin={setShowModalLogin}
          setCantidadTotal={setCantidadTotal}
        />
      </Container>
    </>
  );
};
export default Indumentaria;
