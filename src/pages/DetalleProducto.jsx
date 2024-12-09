import { Button, Container } from "react-bootstrap";
import "../css/DetalleProducto.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clientAxios from "../helpers/axios.config";

const DetalleProducto = ({ setShowModalLogin }) => {
  const params = useParams();
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cantidad = 1;

  const obtenerProducto = async () => {
    const result = await clientAxios.get(`productosgym/${params.idProducto}`);
    setProducto(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    obtenerProducto();
  }, []);

  if (isLoading) {
    return <h2>Cargando producto...</h2>;
  }

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

  const agregarAlCarrito = () => {
    const token = JSON.parse(sessionStorage.getItem("token")) || "";

    if (!token) {
      alert("Debes iniciar sesion para agregar el producto al carrito");
      setShowModalLogin(true);
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
              <strong>${producto.precio * cantidad.toFixed(2)}</strong>
            </div>
            <div className="d-flex mt-4 contenedor-cantidad">
              <div className="d-flex align-items-center">
                <strong>Cantidad</strong>
              </div>
              <Button
                className="boton-signo text-center"
                variant="warning"
                // onClick={disminuirCantidad}
              >
                -
              </Button>
              <div className="d-flex align-items-center numero-cantidad">
                <span>{cantidad}</span>
              </div>
              <Button
                className="boton-signo"
                variant="warning"
                // onClick={aumentarCantidad}
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
