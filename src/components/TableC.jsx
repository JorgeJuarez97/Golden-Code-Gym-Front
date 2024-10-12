import { Button, Container, Table } from "react-bootstrap";
import "../css/TableC.css";
import { useState } from "react";
import ModalLogin from "./ModalLogin";

const TableC = ({ productos, actualizarProductos }) => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleShow = (producto) => {
    setProductoSeleccionado(producto);
    setShowModalLogin(true);
  };

  const handleClose = () => {
    setShowModalLogin(false);
    setProductoSeleccionado(null);
  };

  const eliminarProducto = (producto) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      const productosGuardados =
        producto.tipo === "suplementos"
          ? JSON.parse(localStorage.getItem("suplementos")) || []
          : JSON.parse(localStorage.getItem("indumentarias")) || [];

      const productosActualizados = productosGuardados.filter(
        (p) => p.id !== producto.id
      );

      localStorage.setItem(
        producto.tipo === "suplementos" ? "suplementos" : "indumentarias",
        JSON.stringify(productosActualizados)
      );

      actualizarProductos(productosActualizados);

      alert("Producto eliminado correctamente");
    }
  };

  return (
    <>
      <Container>
        <Table striped bordered className="tabla-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={`${producto.tipo}-${producto.id}`}>
                <td className="text-center">{producto.id}</td>
                <td className="d-flex justify-content-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={({ width: 50 }, { height: 50 })}
                  />
                </td>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                  <div className="texto-oculto">{producto.descripcion}</div>
                </td>
                <td>
                  <div className="d-flex justify-content-around">
                    <Button
                      style={{ width: 80 }}
                      variant="warning"
                      onClick={() => handleShow(producto)}
                    >
                      Editar
                    </Button>
                    <Button
                      style={{ width: 80 }}
                      variant="danger"
                      onClick={() => eliminarProducto(producto)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {productoSeleccionado && (
        <ModalLogin
          show={showModalLogin}
          handleClose={handleClose}
          producto={productoSeleccionado}
          setProductos={actualizarProductos}
          productos={productos}
        />
      )}
    </>
  );
};

export default TableC;
