import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/FormC.css";
import { useState } from "react";

const FormC = ({ idPage, producto, setProductos, productos, handleClose }) => {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [precio, setPrecio] = useState(producto?.precio || "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion || "");
  const [imagen, setImagen] = useState(producto?.imagen || "");
  const [archivoImagen, setArchivoImagen] = useState(null);

  const ultimoId =
    productos.length > 0 ? Math.max(...productos.map((prod) => prod.id)) : 0;
  const nuevoId = ultimoId + 1;

  const handleArchivoSeleccionado = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
      };
      reader.readAsDataURL(file);
      setArchivoImagen(file);
    }
  };

  const handleGuardarCambios = (e) => {
    e.preventDefault();

    if (!producto) {
      const nuevoProducto = {
        id: nuevoId,
        nombre,
        precio,
        descripcion,
        imagen,
      };

      const nuevosProductos = [...productos, nuevoProducto];
      setProductos(nuevosProductos);

      localStorage.setItem(
        idPage === "suplementos" ? "suplementos" : "indumentarias",
        JSON.stringify(nuevosProductos)
      );

      alert("Producto agregado correctamente");
    } else {
      const productosActualizados = productos.map((prod) =>
        prod.id === producto.id
          ? {
              ...prod,
              nombre,
              precio,
              descripcion,
              imagen: archivoImagen ? imagen : prod.imagen,
            }
          : prod
      );

      setProductos(productosActualizados);

      localStorage.setItem(
        producto.tipo === "suplementos" ? "suplementos" : "indumentarias",
        JSON.stringify(productosActualizados)
      );

      alert("Cambios guardados correctamente");
    }

    handleClose();
  };

  return (
    <>
      <Container
        className={
          idPage === "registro" || idPage === "planes"
            ? "mb-5 mt-3 contenedor-formulario-registro"
            : "contenedor-formulario-login"
        }
      >
        <Form onSubmit={handleGuardarCambios}>
          {(idPage === "registro" || idPage === "planes") && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" />
              <Form.Text className="text-muted">
                Debes ingresar tu nombre
              </Form.Text>
            </Form.Group>
          )}
          {(idPage === "registro" || idPage === "planes") && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="Apellido" />
              <Form.Text className="text-muted">
                Debes ingresar tu apellido
              </Form.Text>
            </Form.Group>
          )}
          {(idPage === "registro" || idPage === "planes") && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted">
                Debes ingresar tu email
              </Form.Text>
            </Form.Group>
          )}
          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="number" placeholder="DNI" />
              <Form.Text className="text-muted">
                Debes ingresar su DNI
              </Form.Text>
            </Form.Group>
          )}
          {idPage === "login" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Usuario" />
              <Form.Text className="text-muted">
                Debes ingresar tu email
              </Form.Text>
            </Form.Group>
          )}

          {(idPage === "registro" || idPage === "login") && (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
          )}

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Repetir Contraseña" />
            </Form.Group>
          )}

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Acepto los terminos y condiciones"
              />
            </Form.Group>
          )}

          {idPage === "admin" && (
            <>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={producto ? producto.id : nuevoId}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleArchivoSeleccionado}
                />
              </Form.Group>

              {imagen && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={imagen}
                    alt="Vista previa"
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Form.Group>
            </>
          )}

          <div className="contenedor-boton-registro">
            <Button
              className="boton-registro mt-3"
              variant="primary"
              type="submit"
            >
              {idPage === "registro"
                ? "Registrarse"
                : idPage === "login"
                ? "Iniciar"
                : idPage === "admin"
                ? "Guardar"
                : "Enviar datos"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default FormC;
