import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";
import clientAxios from "../helpers/axios.config";

const Indumentaria = ({ setShowModalLogin }) => {
  const [indumentarias, setIndumentarias] = useState([]);

  const getIndumentarias = async () => {
    const products = await clientAxios.get("/productosgym/tipo/indumentarias");
    setIndumentarias(products.data);
  };

  useEffect(() => {
    getIndumentarias();
  }, []);
  return (
    <>
      <CardProductos
        idPage="indumentarias"
        indumentarias={indumentarias}
        setShowModalLogin={setShowModalLogin}
      />
    </>
  );
};
export default Indumentaria;
