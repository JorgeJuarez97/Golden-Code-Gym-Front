import { Container } from "react-bootstrap";
import TableC from "../components/TableC";
import { useEffect, useState } from "react";
import PaginationC from "../components/PaginationC";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import ModalLogin from "../components/ModalLogin";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";

const ListaUsuarios = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    const result = await clientAxios.get("/usuariosgym", configHeaders);
    setUsuarios(result.data.usuarios);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const totalPaginas = Math.ceil(usuarios.length / productosPorPagina);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const usuariosActuales = usuarios.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const eliminarUsuario = async (idUsuario) => {
    const confirmarEliminar = confirm(
      "¿Estas seguro que deseas eliminar este usuario?"
    );

    if (confirmarEliminar) {
      const result = await clientAxios.delete(
        `/usuariosgym/${idUsuario}`,
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getUsuarios();
      }
    }
  };

  const deshabilitarUsuario = async (idUsuario) => {
    const confirmarBloqueo = confirm(
      "¿Estas seguro que deseas bloquear este usuario?"
    );

    if (confirmarBloqueo) {
      const result = await clientAxios.put(
        `/usuariosgym/deshabilitar/${idUsuario}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getUsuarios();
      }
    }
  };

  const habilitarUsuario = async (idUsuario) => {
    const confirmarHabilitar = confirm(
      "¿Estas seguro que deseas habilitar este usuario?"
    );

    if (confirmarHabilitar) {
      const result = await clientAxios.put(
        `/usuariosgym/habilitar/${idUsuario}`,
        {},
        configHeaders
      );

      if (result.status === 200) {
        alert(`${result.data.msg}`);

        await getUsuarios();
      }
    }
  };

  return (
    <>
      <Container className="margin-top-listas margin-bottom-listas">
        <div className="d-flex justify-content-end">
          <ModalLogin idPage="adminCrearUsuarios" getUsuarios={getUsuarios} />
        </div>

        <TableC
          idPage="usuarios"
          usuarios={usuariosActuales}
          eliminarUsuario={eliminarUsuario}
          deshabilitarUsuario={deshabilitarUsuario}
          habilitarUsuario={habilitarUsuario}
          getUsuarios={getUsuarios}
        />
        <PaginationC
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          cambiarPagina={cambiarPagina}
        />
      </Container>
    </>
  );
};

export default ListaUsuarios;
