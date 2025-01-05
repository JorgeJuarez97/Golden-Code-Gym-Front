import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/FormC.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import clientAxios, {
  configHeaders,
  configHeadersImg,
} from "../helpers/axios.config";

const FormC = ({
  idPage,
  handleClose,
  setShowModalLogin,
  usuarios,
  clases,
  profes,
  productos,
  planes,
  getUsuarios,
  getProfes,
  getClases,
  getIndumentarias,
  getSuplementos,
  getPlanes,
  handleCloseReserva,
  handleCloseAgregarModal,
  setShowModalReserva,
}) => {
  const [imagen, setImagen] = useState(null);
  const [infoUsuarios, setInfoUsuarios] = useState(
    usuarios || {
      nombre: "",
      apellido: "",
      dni: "",
      emailUsuario: "",
      rol: "user",
      contrasenia: "",
      repetirContrasenia: "",
    }
  );

  const [infoProductos, setInfoProductos] = useState(productos || "");
  const [infoClases, setInfoClases] = useState(clases || "");
  const [infoProfes, setInfoProfes] = useState(profes || "");
  const [infoPlanes, setInfoPlanes] = useState(planes || "");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();
  const [tieneReserva, setTieneReserva] = useState(false);

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

  const handleUsuarios = (ev) => {
    setInfoUsuarios({ ...infoUsuarios, [ev.target.name]: ev.target.value });
  };

  const handleProductos = (ev) => {
    const { name, type } = ev.target;

    if (type === "file") {
      const file = ev.target.files[0];
      setInfoProductos((prevState) => ({
        ...prevState,
        [name]: file,
        vistaPrevia: URL.createObjectURL(file),
      }));
    } else {
      setInfoProductos((prevState) => ({
        ...prevState,
        [name]: ev.target.value,
      }));
    }
  };

  const handleClases = (ev) => {
    const { name, type } = ev.target;

    if (type === "file") {
      const file = ev.target.files[0];
      setInfoClases((prevState) => ({
        ...prevState,
        [name]: file,
        vistaPrevia: URL.createObjectURL(file),
      }));
    } else {
      setInfoClases((prevState) => ({
        ...prevState,
        [name]: ev.target.value,
      }));
    }
  };

  const handleProfes = (ev) => {
    const { name, type } = ev.target;

    if (type === "file") {
      const file = ev.target.files[0];
      setInfoProfes((prevState) => ({
        ...prevState,
        [name]: file,
        vistaPrevia: URL.createObjectURL(file),
      }));
    } else {
      setInfoProfes((prevState) => ({
        ...prevState,
        [name]: ev.target.value,
      }));
    }
  };

  const handlePlanes = (ev) => {
    setInfoPlanes({ ...infoPlanes, [ev.target.name]: ev.target.value });
  };

  const handleClickUsuarios = async (ev) => {
    ev.preventDefault();
    const result = await clientAxios.put(
      `/usuariosgym/${infoUsuarios._id}`,
      infoUsuarios,
      configHeaders
    );

    if (result.status === 200) {
      alert(`${result.data.msg}`);
      handleClose();

      await getUsuarios();
    }
  };

  const handleClickProductos = async (ev) => {
    ev.preventDefault();
    const result = await clientAxios.put(
      `/productosgym/${infoProductos._id}`,
      infoProductos,
      configHeaders
    );

    if (result.status === 200) {
      if (imagen) {
        const formData = new FormData();
        formData.append("image", imagen);
        const result2 = await clientAxios.post(
          `/productosgym/agregarImagen/${infoProductos._id}`,
          formData,
          configHeadersImg
        );

        if (result2.status === 200) {
          alert(`${result2.data.msg}`);
          handleClose();
        }
      }

      alert(`${result.data.msg}`);
      handleClose();

      {
        idPage === "adminIndumentarias"
          ? await getIndumentarias()
          : await getSuplementos();
      }
    }
  };

  const handleClickClases = async (ev) => {
    ev.preventDefault();
    const result = await clientAxios.put(
      `/clasesgym/${infoClases._id}`,
      infoClases,
      configHeaders
    );

    if (result.status === 200) {
      if (imagen) {
        const formData = new FormData();
        formData.append("image", imagen);
        const result2 = await clientAxios.post(
          `/clasesgym/agregarImagen/${infoClases._id}`,
          formData,
          configHeadersImg
        );

        if (result2.status === 200) {
          alert(`${result2.data.msg}`);
          handleClose();
        }
      }

      alert(`${result.data.msg}`);
      handleClose();

      await getClases();
    }
  };

  const handleClickProfes = async (ev) => {
    ev.preventDefault();
    const result = await clientAxios.put(
      `/profesgym/${infoProfes._id}`,
      infoProfes,
      configHeaders
    );

    if (result.status === 200) {
      if (imagen) {
        const formData = new FormData();
        formData.append("image", imagen);
        const result2 = await clientAxios.post(
          `/profesgym/agregarImagen/${infoProfes._id}`,
          formData,
          configHeadersImg
        );

        if (result2.status === 200) {
          alert(`${result2.data.msg}`);
          handleClose();
        }
      }

      alert(`${result.data.msg}`);
      handleClose();

      await getProfes();
    }
  };

  const handleClickPlanesMensuales = async (ev) => {
    ev.preventDefault();
    const result = await clientAxios.put(
      `/planesgym/${infoPlanes._id}`,
      infoPlanes,
      configHeaders
    );

    if (result.status === 200) {
      alert(`${result.data.msg}`);
      handleClose();

      await getPlanes();
    }
  };

  const handleClickReserva = async (ev) => {
    try {
      ev.preventDefault();
      const token = JSON.parse(sessionStorage.getItem("token")) || "";

      if (!token) {
        alert("Debes iniciar sesion para reservar un cupo en esta clase");
        setShowModalReserva(false);
        return setShowModalLogin(true);
      }

      const result = await clientAxios.post(
        `/clasesgym/reservarCupo/${infoClases._id}`,
        infoClases,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
        setTieneReserva(true);
        await getClases();
        handleCloseReserva();
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  {
    idPage === "reserva" &&
      useEffect(() => {
        const verificarReserva = async () => {
          try {
            const result = await clientAxios.get(
              `/clasesgym/verificarReserva/${infoClases._id}`,
              configHeaders
            );

            if (result.status === 200 && result.data.reservaActiva) {
              setTieneReserva(true);
            } else {
              return setTieneReserva(false);
            }
          } catch (error) {
            console.error("Error al verificar reserva:", error);
          }
        };

        verificarReserva();
      }, [infoClases?._id, configHeaders]);
  }

  const handleClickCancelarReserva = async (ev) => {
    try {
      ev.preventDefault();
      const result = await clientAxios.delete(
        `/clasesgym/eliminarReservarCupo/${infoClases._id}`,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);
        setTieneReserva(false);
        await getClases();
        handleCloseReserva();
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  const handleClikCrearProfe = async (ev) => {
    try {
      ev.preventDefault();

      const { nombreProfe, imagen, clase, zonaDeMusculacion, reseñaAcademica } =
        infoProfes;

      if (
        !nombreProfe ||
        !imagen ||
        !clase ||
        !zonaDeMusculacion ||
        !reseñaAcademica
      ) {
        return alert("Algun campo esta vacio");
      }

      const result = await clientAxios.post(
        "/profesgym",
        { ...infoProfes, imagen: undefined },
        configHeaders
      );

      if (result.status === 201) {
        const nuevoProfeId = result.data.nuevoProfe._id;
        console.log(nuevoProfeId);
        if (nuevoProfeId && imagen) {
          const formData = new FormData();
          formData.append("image", imagen);
          const result2 = await clientAxios.post(
            `/profesgym/agregarImagen/${nuevoProfeId}`,
            formData,
            configHeadersImg
          );

          if (result2.status === 200) {
            alert(`${result2.data.msg}`);
          }
        }
        alert(`${result.data.msg}`);
        handleCloseAgregarModal();
        await getProfes();
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  const handleClikCrearClase = async (ev) => {
    try {
      ev.preventDefault();

      const {
        nombreClase,
        imagen,
        horario,
        dia,
        cuposPorDia,
        descripcionClase,
      } = infoClases;

      if (
        !nombreClase ||
        !imagen ||
        !horario ||
        !dia ||
        !cuposPorDia ||
        !descripcionClase
      ) {
        return alert("Algun campo esta vacio");
      }

      const result = await clientAxios.post(
        "/clasesgym",
        { ...infoClases, imagen: undefined },
        configHeaders
      );

      if (result.status === 201) {
        const nuevaClaseId = result.data.nuevaClase._id;
        console.log(nuevaClaseId);
        if (nuevaClaseId && imagen) {
          const formData = new FormData();
          formData.append("image", imagen);
          const result2 = await clientAxios.post(
            `/clasesgym/agregarImagen/${nuevaClaseId}`,
            formData,
            configHeadersImg
          );

          if (result2.status === 200) {
            alert(`${result2.data.msg}`);
          }
        }
        alert(`${result.data.msg}`);
        handleCloseAgregarModal();
        await getClases();
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  const handleClikCrearProductos = async (ev) => {
    try {
      ev.preventDefault();

      const { tipoDeProducto, nombreProducto, imagen, precio, descripcion } =
        infoProductos;

      if (
        !tipoDeProducto ||
        !nombreProducto ||
        !imagen ||
        !precio ||
        !descripcion
      ) {
        return alert("Algun campo esta vacio");
      }

      const result = await clientAxios.post(
        "/productosgym",
        { ...infoProductos, imagen: undefined },
        configHeaders
      );

      if (result.status === 201) {
        const nuevoProductoId = result.data.nuevoProducto._id;
        console.log(nuevoProductoId);
        if (nuevoProductoId && imagen) {
          const formData = new FormData();
          formData.append("image", imagen);
          const result2 = await clientAxios.post(
            `/productosgym/agregarImagen/${nuevoProductoId}`,
            formData,
            configHeadersImg
          );

          if (result2.status === 200) {
            alert(`${result2.data.msg}`);
          }
        }
        alert(`${result.data.msg}`);
        handleCloseAgregarModal();
        {
          idPage === "adminCrearIndumentarias"
            ? await getIndumentarias()
            : await getSuplementos();
        }
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  const handleClikCrearUsuarios = async (ev) => {
    try {
      ev.preventDefault();

      const {
        nombre,
        apellido,
        dni,
        emailUsuario,
        rol,
        contrasenia,
        repetirContrasenia,
      } = infoUsuarios;

      console.log(infoUsuarios);

      if (
        !nombre ||
        !apellido ||
        !dni ||
        !emailUsuario ||
        !rol ||
        !contrasenia ||
        !repetirContrasenia
      ) {
        return alert("Algun campo esta vacio");
      }

      if (contrasenia != repetirContrasenia) {
        return alert("Las contraseñas no son iguales");
      }

      const result = await clientAxios.post(
        "/usuariosgym",
        infoUsuarios,
        configHeaders
      );

      if (result.status === 201) {
        alert(`${result.data.msg}`);
        handleCloseAgregarModal();
        await getUsuarios();
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  const handleClikCrearPlanes = async (ev) => {
    try {
      ev.preventDefault();

      const { nombrePlan, acceso, cuotaMensual, descripcion } = infoPlanes;

      if (!nombrePlan || !acceso || !cuotaMensual || !descripcion) {
        return alert("Algun campo esta vacio");
      }

      const result = await clientAxios.post(
        "/planesgym",
        infoPlanes,
        configHeaders
      );

      if (result.status === 201) {
        alert(`${result.data.msg}`);
        handleCloseAgregarModal();
        await getPlanes();
      }
    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  useEffect(() => {
    setInfoProductos((prevState) => ({
      ...prevState,
      tipoDeProducto:
        idPage === "adminCrearIndumentarias"
          ? "indumentarias"
          : idPage === "adminCrearSuplementos"
          ? "suplementos"
          : prevState.tipoDeProducto,
    }));
  }, [idPage]);

  useEffect(() => {
    return () => {
      if (infoClases?.vistaPrevia) {
        URL.revokeObjectURL(infoClases.vistaPrevia);
      }
    };
  }, [infoClases?.vistaPrevia]);

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
          onSubmit={
            idPage === "adminSuplementos" || idPage === "adminIndumentarias"
              ? handleClickProductos
              : idPage === "adminUsuarios"
              ? handleClickUsuarios
              : idPage === "adminClases"
              ? handleClickClases
              : idPage === "adminProfes"
              ? handleClickProfes
              : idPage === "adminPlanes"
              ? handleClickPlanesMensuales
              : idPage === "adminCrearProfes"
              ? handleClikCrearProfe
              : idPage === "adminCrearClases"
              ? handleClikCrearClase
              : idPage === "adminCrearIndumentarias" ||
                idPage === "adminCrearSuplementos"
              ? handleClikCrearProductos
              : idPage === "adminCrearUsuarios"
              ? handleClikCrearUsuarios
              : idPage === "adminCrearPlanes"
              ? handleClikCrearPlanes
              : idPage === "reserva"
              ? tieneReserva
                ? handleClickCancelarReserva
                : handleClickReserva
              : handleSubmit(
                  idPage === "registro" ? handleClickRegister : handleCLickLogin
                )
          }
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

          {(idPage === "adminSuplementos" ||
            idPage === "adminIndumentarias" ||
            idPage === "adminCrearIndumentarias" ||
            idPage === "adminCrearSuplementos") && (
            <>
              <Form.Group className="mb-3" controlId="form-id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={infoProductos?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-tipoProducto">
                <Form.Label>Tipo de producto</Form.Label>
                <Form.Control
                  type="text"
                  name="tipoDeProducto"
                  placeholder="Tipo de producto"
                  aria-label="Disabled input example"
                  value={
                    idPage === "adminSuplementos" ||
                    idPage === "adminIndumentarias"
                      ? infoProductos?.tipoDeProducto
                      : idPage === "adminCrearIndumentarias"
                      ? "indumentarias"
                      : idPage === "adminCrearSuplementos"
                      ? "suplementos"
                      : ""
                  }
                  readOnly
                  required
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="imagen"
                  onChange={handleProductos}
                  required
                />
              </Form.Group>

              {(infoProductos?.vistaPrevia || infoProductos?.imagen) && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={infoProductos.vistaPrevia || infoProductos.imagen}
                    alt="Vista previa"
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="form-nombreProducto">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreProducto"
                  placeholder="Ingrese el nombre del producto"
                  required
                  value={infoProductos?.nombreProducto || ""}
                  onChange={handleProductos}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  placeholder="Precio"
                  required
                  value={infoProductos?.precio || ""}
                  onChange={handleProductos}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  required
                  rows={3}
                  value={infoProductos?.descripcion || ""}
                  onChange={handleProductos}
                />
              </Form.Group>
            </>
          )}

          {(idPage === "adminClases" || idPage === "adminCrearClases") && (
            <>
              <Form.Group className="mb-3" controlId="form-idClase">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={infoClases?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-nombreClase">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreClase"
                  placeholder="Ingrese el nombre de la clase"
                  required
                  value={infoClases?.nombreClase || ""}
                  onChange={handleClases}
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="imagen"
                  onChange={handleClases}
                  required
                />
              </Form.Group>

              {(infoClases?.vistaPrevia || infoClases?.imagen) && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={infoClases.vistaPrevia || infoClases.imagen}
                    alt="Vista previa"
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="form-horario">
                <Form.Label>Horario</Form.Label>
                <Form.Control
                  type="text"
                  name="horario"
                  placeholder="Horario"
                  required
                  value={infoClases?.horario || ""}
                  onChange={handleClases}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-dia">
                <Form.Label>Dia</Form.Label>
                <Form.Control
                  type="text"
                  name="dia"
                  placeholder="Dia"
                  required
                  value={infoClases?.dia || ""}
                  onChange={handleClases}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-cuposPorDia">
                <Form.Label>Cupos por dia</Form.Label>
                <Form.Control
                  type="number"
                  name="cuposPorDia"
                  placeholder="Cupos por dia"
                  value={infoClases?.cuposPorDia || ""}
                  onChange={handleClases}
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
                  name="descripcionClase"
                  required
                  rows={3}
                  value={infoClases?.descripcionClase || ""}
                  onChange={handleClases}
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
                  name="id"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={infoUsuarios?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-nombreUsuario">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingrese el nombre del usuario"
                  required
                  value={infoUsuarios?.nombre || ""}
                  onChange={handleUsuarios}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-apellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  required
                  value={infoUsuarios?.apellido || ""}
                  onChange={handleUsuarios}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-dni">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="number"
                  name="dni"
                  placeholder="DNI"
                  required
                  value={infoUsuarios?.dni || ""}
                  onChange={handleUsuarios}
                  minLength={7}
                  maxLength={8}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-emailUsuario">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="emailUsuario"
                  placeholder="Email"
                  required
                  value={infoUsuarios?.emailUsuario || ""}
                  onChange={handleUsuarios}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-rol">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="rol"
                  required
                  value={infoUsuarios?.rol || "user"}
                  onChange={handleUsuarios}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </Form.Select>
              </Form.Group>
            </>
          )}

          {idPage === "adminCrearUsuarios" && (
            <>
              <Form.Group className="mb-3" controlId="form-idUsuario">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={infoUsuarios?._id}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-nombreUsuario">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingrese el nombre del usuario"
                  required
                  value={infoUsuarios?.nombre || ""}
                  onChange={handleUsuarios}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-apellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  required
                  value={infoUsuarios?.apellido || ""}
                  onChange={handleUsuarios}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-dni">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="number"
                  name="dni"
                  placeholder="DNI"
                  required
                  value={infoUsuarios?.dni || ""}
                  onChange={handleUsuarios}
                  minLength={7}
                  maxLength={8}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-emailUsuario">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="emailUsuario"
                  placeholder="Email"
                  required
                  value={infoUsuarios?.emailUsuario || ""}
                  onChange={handleUsuarios}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-rol">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="rol"
                  required
                  value={infoUsuarios?.rol || "user"}
                  onChange={handleUsuarios}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-contrasenia">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contrasenia"
                  placeholder="Ingrese una contraseña"
                  required
                  value={infoUsuarios?.contrasenia || ""}
                  onChange={handleUsuarios}
                  minLength={8}
                  maxLength={30}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-repetirContrasenia">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="repetirContrasenia"
                  placeholder="Repetir contraseña"
                  required
                  value={infoUsuarios?.repetirContrasenia || ""}
                  onChange={handleUsuarios}
                  minLength={8}
                  maxLength={30}
                />
              </Form.Group>
            </>
          )}

          {(idPage === "adminProfes" || idPage === "adminCrearProfes") && (
            <>
              <Form.Group className="mb-3" controlId="form-idProfe">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={infoProfes?._id || ""}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-nombreProfe">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreProfe"
                  placeholder="Ingrese el nombre del profesor"
                  required
                  value={infoProfes?.nombreProfe || ""}
                  onChange={handleProfes}
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="imagen"
                  onChange={handleProfes}
                  required
                />
              </Form.Group>

              {(infoProfes?.vistaPrevia || infoProfes?.imagen) && (
                <div className="d-flex justify-content-center my-2">
                  <img
                    src={infoProfes.vistaPrevia || infoProfes.imagen}
                    alt="Vista previa"
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="form-clase">
                <Form.Label>Clase</Form.Label>
                <Form.Control
                  type="text"
                  name="clase"
                  placeholder="Clase"
                  required
                  value={infoProfes?.clase || ""}
                  onChange={handleProfes}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-zona">
                <Form.Label>Zona de musculacion</Form.Label>
                <Form.Control
                  type="text"
                  name="zonaDeMusculacion"
                  placeholder="Zona de musculacion"
                  required
                  value={infoProfes?.zonaDeMusculacion || ""}
                  onChange={handleProfes}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Reseña Academica</Form.Label>
                <Form.Control
                  as="textarea"
                  name="reseñaAcademica"
                  required
                  rows={3}
                  value={infoProfes?.reseñaAcademica || ""}
                  onChange={handleProfes}
                />
              </Form.Group>
            </>
          )}

          {(idPage === "adminPlanes" || idPage === "adminCrearPlanes") && (
            <>
              <Form.Group className="mb-3" controlId="form-idPlan">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  placeholder="ID"
                  aria-label="Disabled input example"
                  value={infoPlanes?._id || ""}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-nombreClase">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombrePlan"
                  placeholder="Ingrese el nombre del plan"
                  required
                  value={infoPlanes?.nombrePlan || ""}
                  onChange={handlePlanes}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-acceso">
                <Form.Label>Acceso</Form.Label>
                <Form.Control
                  type="text"
                  name="acceso"
                  placeholder="Acceso"
                  required
                  value={infoPlanes?.acceso || ""}
                  onChange={handlePlanes}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-cuotaMensual">
                <Form.Label>Cuota Mensual</Form.Label>
                <Form.Control
                  type="number"
                  name="cuotaMensual"
                  placeholder="Cuota Mensual"
                  required
                  value={infoPlanes?.cuotaMensual || ""}
                  onChange={handlePlanes}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  required
                  rows={3}
                  value={infoPlanes?.descripcion || ""}
                  onChange={handlePlanes}
                />
              </Form.Group>
            </>
          )}

          {idPage === "reserva" && (
            <>
              <Form.Group className="mb-3" controlId="form-nombreReserva">
                <Form.Label>Nombre de la clase</Form.Label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={infoClases?.nombreClase}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-horarioReserva">
                <Form.Label>Horario</Form.Label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={infoClases?.horario}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-diaReserva">
                <Form.Label>Dia de clases</Form.Label>
                <Form.Control
                  type="text"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={infoClases?.dia}
                />
              </Form.Group>

              <Form.Text>
                Cupos disponibles {`${infoClases.cuposPorDia}`}
              </Form.Text>
            </>
          )}
          <div className="contenedor-boton-registro">
            <Button
              className="boton-registro mt-3"
              variant={tieneReserva ? "danger" : "primary"}
              type="submit"
            >
              {idPage === "registro"
                ? "Registrarse"
                : idPage === "login"
                ? "Iniciar"
                : idPage === "reserva"
                ? `${tieneReserva ? "Cancelar Reserva" : "Reservar"}`
                : idPage === "adminCrearProfes" ||
                  "adminCrearClases" ||
                  "adminCrearIndumentarias" ||
                  "adminCrearSuplementos" ||
                  "adminCrearUsuarios"
                ? "Agregar"
                : idPage === "adminSuplementos" ||
                  "adminIndumentarias" ||
                  "adminClases" ||
                  "adminUsuarios" ||
                  "adminProfes"
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
