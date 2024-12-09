import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/FormC.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import clientAxios, { configHeaders } from "../helpers/axios.config";

const FormC = ({
  idPage,
  handleClose,
  setShowModalLogin,
  usuarios,
  clases,
  profes,
  suplementos,
  indumentarias,
}) => {
  const [archivoImagen, setArchivoImagen] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  console.log(profes);

  const capitalizeWords = (text) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = capitalizeWords(value);
    setValue(name, capitalizedValue, { shouldValidate: true });
  };

  const handleClickRegister = async (data) => {
    console.log(data);
    const {
      nombre,
      apellido,
      dni,
      emailUsuario,
      contrasenia,
      repetirContrasenia,
    } = data;

    if (
      !nombre ||
      !apellido ||
      !dni ||
      !emailUsuario ||
      !contrasenia ||
      !repetirContrasenia
    ) {
      return alert("Algun campo esta vacio, por favor completa el formulario.");
    }

    if (contrasenia === repetirContrasenia) {
      const result = await clientAxios.post(
        "/usuariosgym",
        {
          nombre,
          apellido,
          dni,
          emailUsuario,
          contrasenia,
        },
        configHeaders
      );

      console.log(result);

      if (result.status === 201) {
        alert("Usuario registrado con exito.");
        reset();
        setTimeout(() => {
          setShowModalLogin(true);
        }, 1000);
      }
    } else {
      alert("Las contraseñas no son iguales");
    }
  };

  const handleCLickLogin = async (data) => {
    try {
      const { usuario, contrasenia } = data;

      if ((!usuario, !contrasenia)) {
        return alert(
          "Algun campo esta vacio, por favor completa el formulario."
        );
      }

      const result = await clientAxios.post(
        "/usuariosgym/iniciarSesion",
        {
          emailUsuario: usuario,
          contrasenia,
        },
        configHeaders
      );

      if (result.status === 200) {
        sessionStorage.setItem("token", JSON.stringify(result.data.token));
        sessionStorage.setItem("rol", JSON.stringify(result.data.rol));

        if (result.data.rol === "admin") {
          setTimeout(() => {
            navigate("/paneladministrador");
          }, 500);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
        setShowModalLogin(false);
        reset();
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.bloqueado) {
          return alert("Usuario bloqueado. Comunicarse con un administrador");
        }
      }
    }
  };

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

  const handleGuardarCambios = () => {
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
            ? "mt-3 contenedor-formulario-registro"
            : idPage === "contacto"
            ? "contenedor-formulario-contacto"
            : "contenedor-formulario-login"
        }
      >
        <Form
          onSubmit={handleSubmit(
            idPage === "admin"
              ? handleGuardarCambios
              : idPage === "registro"
              ? handleClickRegister
              : handleCLickLogin
          )}
        >
          {(idPage === "registro" ||
            idPage === "planes" ||
            idPage === "contacto") && (
            <Form.Group className="mb-3" controlId="form-nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre"
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "Nombre es requerido",
                  },
                  minLength: { value: 2, message: "Minimo 2 caracteres" },
                  maxLength: { value: 20, message: "Maximo 20 caracteres" },
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
                onChange={handleChange}
              />
              <Form.Text className="invalido">
                {errors.nombre && <span>{errors.nombre.message}</span>}
              </Form.Text>
            </Form.Group>
          )}
          {(idPage === "registro" ||
            idPage === "planes" ||
            idPage === "contacto") && (
            <Form.Group className="mb-3" controlId="form-apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                placeholder="Apellido"
                {...register("apellido", {
                  required: { value: true, message: "Apellido es requerido" },
                  minLength: { value: 2, message: "Minimo 2 caracteres" },
                  maxLength: { value: 20, message: "Maximo 20 caracteres" },
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
                onChange={handleChange}
              />
              <Form.Text className="invalido">
                {errors.apellido && <span>{errors.apellido.message}</span>}
              </Form.Text>
            </Form.Group>
          )}
          {(idPage === "registro" ||
            idPage === "planes" ||
            idPage === "contacto") && (
            <Form.Group className="mb-3" controlId="form-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="emailUsuario"
                placeholder="Email"
                {...register("emailUsuario", {
                  required: { value: true, message: "Email es requerido" },
                  pattern: {
                    value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                    message: "El email no es valido",
                  },
                })}
              />
              <Form.Text className="invalido">
                {errors.emailUsuario && (
                  <span>{errors.emailUsuario.message}</span>
                )}
              </Form.Text>
            </Form.Group>
          )}
          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="form-dni">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="number"
                name="dni"
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
            <Form.Group className="mb-3" controlId="form-usuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                name="usuario"
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
            <Form.Group className="mb-3" controlId="form-contraseña">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasenia"
                placeholder="Ingresa tu contraseña"
                {...register("contrasenia", {
                  required: { value: true, message: "Contraseña es requerida" },
                  minLength: { value: 8, message: "Minimo de 8 caracteres" },
                  maxLength: { value: 16, message: "Maximo de 16 caracteres" },
                })}
              />
              <Form.Text className="invalido">
                {errors.contrasenia && (
                  <span>{errors.contrasenia.message}</span>
                )}
              </Form.Text>
            </Form.Group>
          )}
          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="form-repetirContraseña">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="repetirContrasenia"
                placeholder="Repetir Contraseña"
                {...register("repetirContrasenia", {
                  required: {
                    value: true,
                    message: "Repetir contraseña es requerido",
                  },
                  validate: (value) =>
                    value === watch("contrasenia") ||
                    "Las contraseñas no coinciden",
                })}
              />
              <Form.Text className="invalido">
                {errors.repetirContrasenia && (
                  <span>{errors.repetirContrasenia.message}</span>
                )}
              </Form.Text>
            </Form.Group>
          )}
          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="form-checkbox">
              <Form.Check
                type="checkbox"
                label="Acepto los terminos y condiciones"
                name="aceptarTerminos"
                {...register("aceptarTerminos", { required: true })}
              />
            </Form.Group>
          )}
          {idPage === "adminSuplementos" && (
            <>
              <Form.Group className="mb-3" controlId="form-id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={suplementos?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-tipoProducto">
                <Form.Label>Tipo de producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tipo de producto"
                  aria-label="Disabled input example"
                  value={suplementos?.tipoDeProducto}
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

              {suplementos.imagen && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={suplementos.imagen}
                    alt="Vista previa"
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="form-nombreProducto">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  required
                  value={suplementos?.nombreProducto}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Precio"
                  required
                  value={suplementos?.precio}
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
                  value={suplementos?.descripcion}
                />
              </Form.Group>
            </>
          )}

          {idPage === "adminIndumentarias" && (
            <>
              <Form.Group className="mb-3" controlId="form-id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={indumentarias?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-tipoProducto">
                <Form.Label>Tipo de producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tipo de producto"
                  aria-label="Disabled input example"
                  value={indumentarias?.tipoDeProducto}
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

              {indumentarias?.imagen && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={indumentarias?.imagen}
                    alt="Vista previa"
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="form-nombreProducto">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  required
                  value={indumentarias?.nombreProducto}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Precio"
                  required
                  value={indumentarias?.precio}
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
                  value={indumentarias?.descripcion}
                />
              </Form.Group>
            </>
          )}

          {idPage === "adminClases" && (
            <>
              <Form.Group className="mb-3" controlId="form-idClase">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={clases?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-nombreClase">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la clase"
                  required
                  value={clases?.nombreClase}
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

              {clases?.imagen && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={clases?.imagen}
                    alt="Vista previa"
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="form-horario">
                <Form.Label>Horario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Horario"
                  required
                  value={clases?.horario}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-dia">
                <Form.Label>Dia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dia"
                  required
                  value={clases?.dia}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-cuposPorDia">
                <Form.Label>Cupos por dia</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Cupos por dia"
                  value={clases?.cuposPorDia}
                  required
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
                  value={clases?.descripcionClase}
                />
              </Form.Group>
            </>
          )}

          {idPage === "adminUsuarios" && (
            <>
              <Form.Group className="mb-3" controlId="form-idUsuario">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={usuarios?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-nombreUsuario">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del usuario"
                  required
                  value={usuarios?.nombre}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-apellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  required
                  value={usuarios?.apellido}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-dni">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="DNI"
                  required
                  value={usuarios?.dni}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-emailUsuario">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  value={usuarios?.emailUsuario}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-rol">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Rol"
                  required
                  value={usuarios?.rol}
                />
              </Form.Group>
            </>
          )}

          {idPage === "adminProfes" && (
            <>
              <Form.Group className="mb-3" controlId="form-idProfe">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={profes?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-nombreProfe">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del profesor"
                  required
                  value={profes?.nombreProfe}
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

              {profes?.imagen && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={profes?.imagen}
                    alt="Vista previa"
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="form-clase">
                <Form.Label>Clase</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Clase"
                  required
                  value={profes?.clase}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-zona">
                <Form.Label>Zona de musculacion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zona de musculacion"
                  required
                  value={profes?.zonaDeMusculacion}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Reseña Academica</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  rows={3}
                  value={profes?.reseñaAcademica}
                />
              </Form.Group>
            </>
          )}

          {idPage === "reserva" && (
            <>
              <Form.Group className="mb-3" controlId="form-horarioReserva">
                <Form.Label>Horario</Form.Label>
                <Form.Control
                  type="number"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-horarioReserva">
                <Form.Label>Dias de clases</Form.Label>
                <Form.Select aria-label="Default select example" required>
                  <option>Selecciona el dia</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Form.Select>
              </Form.Group>

              <Form.Text>Cupos disponibles 20</Form.Text>
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
                : idPage === "adminSuplementos" ||
                  "adminIndumentarias" ||
                  "adminClases" ||
                  "adminUsuarios" ||
                  "adminProfes"
                ? "Guardar"
                : idPage === "reserva"
                ? "Reservar"
                : "Enviar datos"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default FormC;
