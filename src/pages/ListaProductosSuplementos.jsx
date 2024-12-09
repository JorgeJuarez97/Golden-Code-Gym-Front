import { Button, Container } from "react-bootstrap";
import TableC from "../components/TableC";
import PaginationC from "../components/PaginationC";
import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";
// import ModalLogin from "../components/ModalLogin";

const ListaProductosSuplementos = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [showAgregarModal, setShowAgregarModal] = useState(false);

  const [suplementos, setSuplementos] = useState([]);

  const getSuplementos = async () => {
    const products = await clientAxios.get("/productosgym/tipo/suplementos");
    setSuplementos(products.data);
  };

  useEffect(() => {
    getSuplementos();
  }, []);

  const eliminarProducto = async (idProducto) => {
    const confirmarEliminar = confirm(
      "¿Estas seguro que deseas eliminar este producto?"
    );

    if (confirmarEliminar) {
      const result = await clientAxios.delete(
        `/productosgym/${idProducto}`,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getSuplementos();
      }
    }
  };

  const deshabilitarProducto = async (idProducto) => {
    const confirmarBloqueo = confirm(
      "¿Estas seguro que deseas bloquear este producto?"
    );

    if (confirmarBloqueo) {
      const result = await clientAxios.put(
        `/productosgym/deshabilitar/${idProducto}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getSuplementos();
      }
    }
  };

  const habilitarProducto = async (idProducto) => {
    const confirmarHabilitar = confirm(
      "¿Estas seguro que deseas habilitar este producto?"
    );

    if (confirmarHabilitar) {
      const result = await clientAxios.put(
        `/productosgym/habilitar/${idProducto}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getSuplementos();
      }
    }
  };

  const totalPaginas = Math.ceil(suplementos.length / productosPorPagina);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const suplementosActuales = suplementos.slice(
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
            Agregar Producto
          </Button>
        </div>

        <TableC
          idPage="suplementos"
          suplementos={suplementosActuales}
          eliminarProducto={eliminarProducto}
          deshabilitarProducto={deshabilitarProducto}
          habilitarProducto={habilitarProducto}
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

export default ListaProductosSuplementos;
