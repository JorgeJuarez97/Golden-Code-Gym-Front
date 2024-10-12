import { Button, Container } from "react-bootstrap";
import "../css/DetalleProducto.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DetalleProducto = () => {
  const { tipo, productoId } = useParams();

  const productos =
    tipo === "suplementos"
      ? JSON.parse(localStorage.getItem("suplementos"))
      : JSON.parse(localStorage.getItem("indumentarias"));

  const producto = productos.find((p) => p.id === parseInt(productoId));

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

  const [cantidad, setCantidad] = useState(1);
  const [precioProducto] = useState(producto.precio);

  const aumentarCantidad = () => {
    setCantidad((prevCantidad) => prevCantidad + 1);
  };

  const disminuirCantidad = () => {
    setCantidad((prevCantidad) => Math.max(1, prevCantidad - 1));
  };

  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocal);
  }, []);

  const agregarAlCarrito = () => {
    const carritoActual = [...carrito];
    const productoExistente = carritoActual.find(
      (p) => p.id === producto.id && p.tipo === tipo
    );

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carritoActual.push({
        ...producto,
        tipo,
        cantidad,
      });
    }

    setCarrito(carritoActual);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    alert("Producto agregado al carrito");
    window.dispatchEvent(new Event("storage"));
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
              <strong>${(precioProducto * cantidad).toFixed(2)}</strong>
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
                <span>{cantidad}</span>
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

              <Button
                className="boton-pagar"
                variant="warning"
                onClick={() => agregarAlCarrito(producto)}
              >
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
