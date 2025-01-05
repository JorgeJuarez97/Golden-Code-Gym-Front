import { Button, Container } from "react-bootstrap";
import "../css/DetalleProducto.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";

const DetalleProducto = ({ setShowModalLogin, setCantidadTotal }) => {
  const params = useParams();
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  const obtenerProducto = async () => {
    const result = await clientAxios.get(
      `productosgym/${params.idProducto}`,
      configHeaders
    );
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

  const agregarAlCarrito = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token")) || "";

      if (!token) {
        alert("Debes iniciar sesion para agregar el producto al carrito");
        setShowModalLogin(true);
      }

      const result = await clientAxios.post(
        `/productosgym/agregarProductoCarrito/${params.idProducto}`,
        { cantidad },
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
      }

      setCantidadTotal((prevCantidad) => prevCantidad + cantidad);
    } catch (error) {
      alert(`${error.response.msg}`);
    }
  };

  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const reducirCantidad = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <>
      <Container className="margin-top-detalle-producto margin-bottom-detalle-producto">
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
                onClick={reducirCantidad}
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
