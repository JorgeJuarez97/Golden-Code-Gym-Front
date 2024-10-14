import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/FormC.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const FormC = ({ idPage, producto, setProductos, productos, handleClose }) => {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [precio, setPrecio] = useState(producto?.precio || "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion || "");
  const [imagen, setImagen] = useState(producto?.imagen || "");
  const [archivoImagen, setArchivoImagen] = useState(null);
  const location = useLocation();
  const tipoProducto = location.pathname.includes("suplementos")
    ? "suplementos"
    : "indumentarias";
  const [tipo, setTipo] = useState(producto?.tipo || tipoProducto);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const mostrarDatos = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  const ultimoId =
    productos && productos.length > 0
      ? Math.max(...productos.map((prod) => prod.id))
      : 0;
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
        tipo,
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
        <Form
          onSubmit={idPage === "admin" ? handleGuardarCambios : mostrarDatos}
        >
          {(idPage === "registro" || idPage === "planes") && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "Nombre es requerido",
                  },
                  minLength: { value: 2, message: "Minimo 2 caracteres" },
                  maxLength: { value: 20, message: "Maximo 20 caracteres" },
                })}
              />
              <Form.Text className="invalido">
                {errors.nombre && <span>{errors.nombre.message}</span>}
              </Form.Text>
            </Form.Group>
          )}
          {(idPage === "registro" || idPage === "planes") && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                {...register("apellido", {
                  required: { value: true, message: "Apellido es requerido" },
                  minLength: { value: 2, message: "Minimo 2 caracteres" },
                  maxLength: { value: 20, message: "Maximo 20 caracteres" },
                })}
              />
              <Form.Text className="invalido">
                {errors.apellido && <span>{errors.apellido.message}</span>}
              </Form.Text>
            </Form.Group>
          )}
          {(idPage === "registro" || idPage === "planes") && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: { value: true, message: "Email es requerido" },
                  pattern: {
                    value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                    message: "El email no es valido",
                  },
                })}
              />
              <Form.Text className="invalido">
                {errors.email && <span>{errors.email.message}</span>}
              </Form.Text>
            </Form.Group>
          )}
          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="number"
                placeholder="DNI"
                {...register("dni", {
                  required: { value: true, message: "DNI es requerido" },
                  minLength: { value: 7, message: "Minimo 7 caracteres" },
                  maxLength: { value: 8, message: "Maximo de 8 caracteres" },
                })}
              />
              <Form.Text className="invalido">
                {errors.dni && <span>{errors.dni.message}</span>}
              </Form.Text>
            </Form.Group>
          )}
          {idPage === "login" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                placeholder="Debes ingresar tu email"
                {...register("usuario", {
                  required: { value: true, message: "Usuario es requerido" },
                  pattern: {
                    value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                    message: "El email no es valido",
                  },
                })}
              />
              <Form.Text className="invalido">
                {errors.usuario && <span>{errors.usuario.message}</span>}
              </Form.Text>
            </Form.Group>
          )}

          {(idPage === "registro" || idPage === "login") && (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register("contraseña", {
                  required: { value: true, message: "Contraseña es requerida" },
                  minLength: { value: 8, message: "Minimo de 8 caracteres" },
                  maxLength: { value: 16, message: "Maximo de 16 caracteres" },
                })}
              />
              <Form.Text className="invalido">
                {errors.contraseña && <span>{errors.contraseña.message}</span>}
              </Form.Text>
            </Form.Group>
          )}

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repetir Contraseña"
                {...register("repetirContraseña", {
                  required: {
                    value: true,
                    message: "Repetir contraseña es requerido",
                  },
                  validate: (value) =>
                    value === watch("contraseña") ||
                    "Las contraseñas no coinciden",
                })}
              />
              <Form.Text className="invalido">
                {errors.repetirContraseña && (
                  <span>{errors.repetirContraseña.message}</span>
                )}
              </Form.Text>
            </Form.Group>
          )}

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Acepto los terminos y condiciones"
                {...register("aceptarTerminos", { required: true })}
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

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Tipo de producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tipo de producto"
                  aria-label="Disabled input example"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleArchivoSeleccionado}
                  required
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
                  placeholder="Ingrese el nombre del producto"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Precio"
                  required
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
                  required
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
