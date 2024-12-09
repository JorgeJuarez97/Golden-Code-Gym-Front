import { Button, Container } from "react-bootstrap";
import TableC from "../components/TableC";
import { useEffect, useState } from "react";
import PaginationC from "../components/PaginationC";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import ModalLogin from "../components/ModalLogin";

const ListaProfes = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [showAgregarModal, setShowAgregarModal] = useState(false);

  const [profes, setProfes] = useState([]);

  const getProfes = async () => {
    const result = await clientAxios.get("/profesgym", configHeaders);
    setProfes(result.data);
  };

  useEffect(() => {
    getProfes();
  }, []);

  const totalPaginas = Math.ceil(profes.length / productosPorPagina);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const profesActuales = profes.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const eliminarProfe = async (idProfe) => {
    const confirmarEliminar = confirm(
      "¿Estas seguro que deseas eliminar este profesor?"
    );

    if (confirmarEliminar) {
      const result = await clientAxios.delete(
        `/profesgym/${idProfe}`,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getProfes();
      }
    }
  };

  const deshabilitarProfe = async (idProfe) => {
    const confirmarBloqueo = confirm(
      "¿Estas seguro que deseas bloquear este profesor?"
    );

    if (confirmarBloqueo) {
      const result = await clientAxios.put(
        `/profesgym/deshabilitar/${idProfe}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getProfes();
      }
    }
  };

  const habilitarProfe = async (idProfe) => {
    const confirmarHabilitar = confirm(
      "¿Estas seguro que deseas habilitar este profesor?"
    );

    if (confirmarHabilitar) {
      const result = await clientAxios.put(
        `/profesgym/habilitar/${idProfe}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getProfes();
      }
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            className="mb-3"
            onClick={() => setShowAgregarModal(true)}
          >
            Crear Profesor
          </Button>
        </div>

        <TableC
          idPage="profes"
          profes={profesActuales}
          eliminarProfe={eliminarProfe}
          deshabilitarProfe={deshabilitarProfe}
          habilitarProfe={habilitarProfe}
        />
        <PaginationC
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          cambiarPagina={cambiarPagina}
        />
      </Container>
      <ModalLogin
        show={showAgregarModal}
        handleClose={() => setShowAgregarModal(false)}
      />
    </>
  );
};

export default ListaProfes;
