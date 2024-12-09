import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";
import clientAxios from "../helpers/axios.config";

const Suplementos = ({ setShowModalLogin }) => {
  const [suplementos, setSuplementos] = useState([]);

  const getSuplementos = async () => {
    const products = await clientAxios.get("/productosgym/tipo/suplementos");
    setSuplementos(products.data);
  };

  useEffect(() => {
    getSuplementos();
  }, []);

  return (
    <>
      <CardProductos
        idPage="suplementos"
        suplementos={suplementos}
        setShowModalLogin={setShowModalLogin}
      />
    </>
  );
};
export default Suplementos;
