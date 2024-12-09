import { Button, Container } from "react-bootstrap";
import TableC from "../components/TableC";
import { useEffect, useState } from "react";
import PaginationC from "../components/PaginationC";
import clientAxios, { configHeaders } from "../helpers/axios.config";

const ListaClases = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [showAgregarModal, setShowAgregarModal] = useState(false);

  const [clases, setClases] = useState([]);

  const getClases = async () => {
    const products = await clientAxios.get("/clasesgym");
    setClases(products.data);
  };

  useEffect(() => {
    getClases();
  }, []);

  const eliminarClase = async (idClase) => {
    const confirmarEliminar = confirm(
      "¿Estas seguro que deseas eliminar esta clase?"
    );

    if (confirmarEliminar) {
      const result = await clientAxios.delete(
        `/clasesgym/${idClase}`,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getClases();
      }
    }
  };

  const deshabilitarClase = async (idClase) => {
    const confirmarBloqueo = confirm(
      "¿Estas seguro que deseas bloquear esta clase?"
    );

    if (confirmarBloqueo) {
      const result = await clientAxios.put(
        `/clasesgym/deshabilitar/${idClase}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getClases();
      }
    }
  };

  const habilitarClase = async (idClase) => {
    const confirmarHabilitar = confirm(
      "¿Estas seguro que deseas habilitar esta clase?"
    );

    if (confirmarHabilitar) {
      const result = await clientAxios.put(
        `/clasesgym/habilitar/${idClase}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getClases();
      }
    }
  };

  const totalPaginas = Math.ceil(clases.length / productosPorPagina);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const clasesActuales = clases.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  // const actualizarProductos = (productosActualizados) => {
  //   setSuplementos(productosActualizados);

  //   localStorage.setItem(
  //     tipo === "suplementos" ? "suplementos" : "indumentarias",
  //     JSON.stringify(productosActualizados)
  //   );
  // };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            className="mb-3"
            onClick={() => setShowAgregarModal(true)}
          >
            Agregar Clase
          </Button>
        </div>

        <TableC
          idPage="clases"
          clases={clasesActuales}
          eliminarClase={eliminarClase}
          deshabilitarClase={deshabilitarClase}
          habilitarClase={habilitarClase}
          // actualizarProductos={actualizarProductos}
        />
        <PaginationC
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          cambiarPagina={cambiarPagina}
        />
      </Container>
      {/* <ModalLogin
        show={showAgregarModal}
        handleClose={() => setShowAgregarModal(false)}
        producto={null}
        setProductos={actualizarProductos}
        productos={productos}
      /> */}
    </>
  );
};

export default ListaClases;
