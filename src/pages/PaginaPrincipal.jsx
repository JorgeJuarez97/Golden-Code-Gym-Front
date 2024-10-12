import { useEffect, useState } from "react";
import CarouselC from "../components/CarouselC";
import Infogym from "../components/Infogym";
import Planes from "../components/Planes";
import { clases, indumentarias, suplementos } from "../helpers/productos";

const PaginaPrincipal = () => {
  const [productos, setProductos] = useState({
    suplementos: [],
    indumentarias: [],
    clases: [],
  });

  useEffect(() => {
    const suplementosLocal = JSON.parse(localStorage.getItem("suplementos"));
    const indumentariasLocal = JSON.parse(
      localStorage.getItem("indumentarias")
    );
    const clasesLocal = JSON.parse(localStorage.getItem("clases"));

    if (!suplementosLocal) {
      localStorage.setItem("suplementos", JSON.stringify(suplementos));
    }
    if (!indumentariasLocal) {
      localStorage.setItem("indumentarias", JSON.stringify(indumentarias));
    }
    if (!clasesLocal) {
      localStorage.setItem("clases", JSON.stringify(clases));
    }

    setProductos({
      suplementos: suplementosLocal || suplementos,
      indumentarias: indumentariasLocal || indumentarias,
      clases: clasesLocal || clases,
    });
  }, []);

  return (
    <>
      <CarouselC />
      <Infogym />
      <Planes />
    </>
  );
};

export default PaginaPrincipal;
