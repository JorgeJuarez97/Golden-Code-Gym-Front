import { Button, Container } from "react-bootstrap";
import TableC from "../components/TableC";
import PaginationC from "../components/PaginationC";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalLogin from "../components/ModalLogin";

const ListaProductos = () => {
  const { tipo } = useParams();
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [showAgregarModal, setShowAgregarModal] = useState(false);

  useEffect(() => {
    const productosGuardados =
      tipo === "suplementos"
        ? JSON.parse(localStorage.getItem("suplementos")) || []
        : JSON.parse(localStorage.getItem("indumentarias")) || [];
    setProductos(productosGuardados);
  }, [tipo]);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const actualizarProductos = (productosActualizados) => {
    setProductos(productosActualizados);

    localStorage.setItem(
      tipo === "suplementos" ? "suplementos" : "indumentarias",
      JSON.stringify(productosActualizados)
    );
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
            Agregar Producto
          </Button>
        </div>

        <TableC
          productos={productosActuales}
          actualizarProductos={actualizarProductos}
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
        producto={null}
        setProductos={actualizarProductos}
        productos={productos}
      />
    </>
  );
};

export default ListaProductos;
