import { Button, Container } from "react-bootstrap";
import "../css/Carrito.css";
import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";

const CarritoPage = ({ setCantidadTotal }) => {
  const [carrito, setCarrito] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idPreference, setIdPreference] = useState(null);

  const getCarrito = async () => {
    const result = await clientAxios.get(
      "/productosgym/obtenerProductosCarrito",
      configHeaders
    );
    setCarrito(result.data.productos);
    setIsLoading(false);
  };

  useEffect(() => {
    getCarrito();
  }, []);

  if (isLoading) {
    return <h2>Cargando producto...</h2>;
  }

  const handleEliminarProductoCarrito = async (id) => {
    try {
      const productoAEliminar = carrito.find((producto) => producto._id === id);

      const confirmarEliminar = confirm(
        "¿Estas seguro que deseas eliminar este producto del carrito?"
      );

      if (confirmarEliminar) {
        const result = await clientAxios.delete(
          `/productosgym/eliminarProductoCarrito/${id}`,
          configHeaders
        );
        if (result.status === 200) {
          alert(`${result.data.msg}`);

          await getCarrito();
        }
      }
      setCantidadTotal(
        (prevCantidad) => prevCantidad - productoAEliminar.cantidad
      );
    } catch (error) {
      alert(`${error.response.msg}`);
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((acumulador, producto) => {
      return acumulador + producto.precio * producto.cantidad;
    }, 0);
  };

  const handleClickMercadoPago = async () => {
    initMercadoPago(`${import.meta.env.VITE_MP_PUBLIC_KEY}`);
    const result = await clientAxios.post(
      "/productosgym/pagarCarritoProductos",
      {},
      configHeaders
    );

    if (result.status === 200) {
      setIdPreference(result.data.url);
    }
  };

  return (
    <>
      <Container className="margin-top-carrito margin-bottom-carrito">
        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>El carrito está vacío</p>
          </div>
        ) : (
          carrito.map((producto) => (
            <div className="contenedor-principal-carrito" key={producto._id}>
              <Container className="d-flex justify-content-around contenedor-producto-carrito">
                <div className="nombre-producto-carrito">
                  <strong>{producto.nombreProducto}</strong>
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
                  <Button
                    variant="danger"
                    onClick={() => handleEliminarProductoCarrito(producto._id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </div>
              </Container>
            </div>
          ))
        )}
        {carrito.length > 0 && (
          <Container className="contenedor-total d-flex flex-column">
            <div className="mt-2 mb-3">
              <strong>Total a pagar:</strong> ${calcularTotal().toFixed(2)}
            </div>
            <div className="text-center mb-3">
              <Button variant="warning" onClick={handleClickMercadoPago}>
                Pagar
              </Button>
            </div>
            <Wallet
              initialization={{
                preferenceId: idPreference,
                redirectMode: "modal",
              }}
            />
          </Container>
        )}
      </Container>
    </>
  );
};

export default CarritoPage;
