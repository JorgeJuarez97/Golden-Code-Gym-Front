import { Button, Container } from "react-bootstrap";
import "../css/DetalleProducto.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DetalleProducto = () => {
  const { tipo, productoId } = useParams();

  const productos =
    tipo === "suplemento"
      ? JSON.parse(localStorage.getItem("suplementos"))
      : JSON.parse(localStorage.getItem("indumentarias"));

  const producto = productos.find((p) => p.id === parseInt(productoId));

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

  const [cantidad, setCantidad] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(producto.precio);

  useEffect(() => {
    setPrecioTotal(producto.precio * cantidad);
  }, [cantidad, producto.precio]);

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <>
      <Container className="my-5">
        <div className="d-flex contenedor-producto-detalle">
          <div>
            <img
              className="imagen-detalle"
              src={producto.imagen}
              alt="Proteina Ena"
            />
          </div>
          <div className="contenedor-detalles">
            <div className="descripcion-detalle">
              <strong>Descripcion: </strong>
              {producto.descripcion}
            </div>
            <div className="text-center texto-precio-detalle">
              <strong>${precioTotal.toFixed(2)}</strong>
            </div>
            <div className="d-flex mt-4 contenedor-cantidad">
              <div className="d-flex align-items-center">
                <strong>Cantidad</strong>
              </div>
              <Button
                className="boton-signo text-center"
                variant="warning"
                onClick={disminuirCantidad}
              >
                -
              </Button>
              <div className="d-flex align-items-center numero-cantidad">
                {" "}
                <span>{cantidad}</span>{" "}
              </div>

              <Button
                className="boton-signo"
                variant="warning"
                onClick={aumentarCantidad}
              >
                +
              </Button>
            </div>
            <div className="contenedor-botones-detalle">
              <Button className="boton-pagar" variant="warning">
                Pagar
              </Button>

              <Button className="boton-pagar" variant="warning">
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DetalleProducto;
