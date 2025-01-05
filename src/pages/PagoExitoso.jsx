import { Container } from "react-bootstrap";
import "../css/PagoExitoso.css";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import { useEffect } from "react";

const PagoExitoso = ({ setCantidadTotal }) => {
  const pagoExitoso = async () => {
    const result = await clientAxios.get(
      "/productosgym/obtenerProductosCarrito",
      configHeaders
    );

    const carrito = result.data.productos;

    if (carrito.length > 0) {
      for (const producto of carrito) {
        const result = await clientAxios.delete(
          `/productosgym/eliminarProductoCarrito/${producto._id}`,
          configHeaders
        );
      }
    }

    setCantidadTotal(0);
  };

  useEffect(() => {
    pagoExitoso();
  }, []);

  return (
    <>
      <Container
        fluid
        className="contenedor-pago-exitoso margin-top-pago-exitoso margin-bottom-pago-exitoso"
      >
        <div className="contenedor-logo-exito">
          <i className="bi bi-check-circle exito"></i>
          <p>¡Su pago se realizó con éxito!</p>
        </div>
      </Container>
    </>
  );
};

export default PagoExitoso;
