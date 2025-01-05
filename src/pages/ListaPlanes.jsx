import { Container } from "react-bootstrap";
import TableC from "../components/TableC";
import { useEffect, useState } from "react";
import PaginationC from "../components/PaginationC";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import ModalLogin from "../components/ModalLogin";
import "../css/MarginBottom.css";
import "../css/MarginBottom.css";

const ListaPlanes = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  const [planes, setPlanes] = useState([]);

  const getPlanes = async () => {
    const result = await clientAxios.get("/planesgym", configHeaders);
    setPlanes(result.data);
  };

  useEffect(() => {
    getPlanes();
  }, []);

  const eliminarPlan = async (idPlan) => {
    const confirmarEliminar = confirm(
      "¿Estas seguro que deseas eliminar este plan?"
    );

    if (confirmarEliminar) {
      const result = await clientAxios.delete(
        `/planesgym/${idPlan}`,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getPlanes();
      }
    }
  };

  const deshabilitarPlan = async (idPlan) => {
    const confirmarBloqueo = confirm(
      "¿Estas seguro que deseas bloquear este plan?"
    );

    if (confirmarBloqueo) {
      const result = await clientAxios.put(
        `/planesgym/deshabilitar/${idPlan}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getPlanes();
      }
    }
  };

  const habilitarPlan = async (idPlan) => {
    const confirmarHabilitar = confirm(
      "¿Estas seguro que deseas habilitar este plan?"
    );

    if (confirmarHabilitar) {
      const result = await clientAxios.put(
        `/planesgym/habilitar/${idPlan}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getPlanes();
      }
    }
  };

  const totalPaginas = Math.ceil(planes.length / productosPorPagina);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const planesActuales = planes.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <>
      <Container className="margin-top-listas margin-bottom-listas">
        <div className="d-flex justify-content-end">
          <ModalLogin idPage="adminCrearPlanes" getPlanes={getPlanes} />
        </div>

        <TableC
          idPage="planes"
          planes={planesActuales}
          eliminarPlan={eliminarPlan}
          deshabilitarPlan={deshabilitarPlan}
          habilitarPlan={habilitarPlan}
          getPlanes={getPlanes}
        />
        <PaginationC
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          cambiarPagina={cambiarPagina}
        />
      </Container>
    </>
  );
};

export default ListaPlanes;
