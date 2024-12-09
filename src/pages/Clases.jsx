import { useEffect, useState } from "react";
import CardProductos from "../components/CardProductos";
import clientAxios from "../helpers/axios.config";

const Clases = () => {
  const [clases, setClases] = useState([]);

  const getClases = async () => {
    const products = await clientAxios.get("/clasesgym");
    setClases(products.data);
  };

  useEffect(() => {
    getClases();
  }, []);
  return (
    <>
      <h1 className="text-center">Bienvenido a nuestras clases</h1>
      <CardProductos idPage="clases" clases={clases} />
    </>
  );
};

export default Clases;
