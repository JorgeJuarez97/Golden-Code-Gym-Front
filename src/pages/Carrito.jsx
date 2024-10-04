import { Button, Container } from "react-bootstrap";
import "../css/Carrito.css";
import { useEffect, useState } from "react";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocal);
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((acumulador, producto) => {
      return acumulador + producto.precio * producto.cantidad;
    }, 0);
  };

  const eliminarDelCarrito = (productoId, tipo) => {
    const carritoActualizado = carrito.filter(
      (producto) => !(producto.id === productoId && producto.tipo === tipo)
    );

    setCarrito(carritoActualizado);
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    confirm("¿Seguro que deseas eliminar este producto?");

    if (true) {
      alert("Producto eliminado del carrito");
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <Container className="contenedor-principal">
        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>El carrito está vacío</p>
          </div>
        ) : (
          carrito.map((producto) => (
            <div
              className="contenedor-principal-carrito"
              key={`${producto.tipo}${producto.id}`}
            >
              <Container className="d-flex justify-content-around contenedor-producto-carrito">
                <div className="nombre-producto-carrito">
                  <strong>{producto.nombre}</strong>
                </div>
                <div>
                  <strong>Cantidad:</strong> {producto.cantidad}
                </div>
                <div>
                  <strong>Precio unitario:</strong> $
                  {producto.precio.toFixed(2)}
                </div>
                <div>
                  <strong>Precio total:</strong> $
                  {(producto.precio * producto.cantidad).toFixed(2)}
                </div>
                <div>
                  <Button variant="danger">
                    <i
                      className="bi bi-trash-fill"
                      onClick={() =>
                        eliminarDelCarrito(producto.id, producto.tipo)
                      }
                    ></i>
                  </Button>
                </div>
              </Container>
            </div>
          ))
        )}
        {carrito.length > 0 && (
          <Container className="contenedor-total d-flex justify-content-between">
            <div>
              <strong>Total a pagar:</strong> ${calcularTotal().toFixed(2)}
            </div>
            <div>
              <Button variant="warning">Pagar</Button>
            </div>
          </Container>
        )}
      </Container>
    </>
  );
};

export default CarritoPage;
