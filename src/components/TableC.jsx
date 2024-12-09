import { Button, Container, Table } from "react-bootstrap";
import "../css/TableC.css";
import ModalLogin from "./ModalLogin";
import { useEffect, useState } from "react";

const TableC = ({
  suplementos,
  indumentarias,
  clases,
  usuarios,
  profes,
  eliminarUsuario,
  eliminarProducto,
  eliminarClase,
  eliminarProfe,
  deshabilitarUsuario,
  habilitarUsuario,
  deshabilitarClase,
  habilitarClase,
  deshabilitarProducto,
  habilitarProducto,
  deshabilitarProfe,
  habilitarProfe,
  // actualizarProductos,
  idPage,
}) => {
  return (
    <>
      <Container className="d-flex justify-content-center">
        <Table striped bordered className="tabla-admin">
          {idPage === "suplementos" && (
            <>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripcion</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {suplementos.map((suplemento) => (
                  <tr key={`${suplemento.tipoDeProducto}-${suplemento._id}`}>
                    <td>
                      <div className="texto-oculto-id">{suplemento._id}</div>
                    </td>
                    <td className="d-flex justify-content-center">
                      <img
                        src={suplemento.imagen}
                        alt={suplemento.nombreProducto}
                        style={({ width: 50 }, { height: 50 })}
                      />
                    </td>
                    <td>{suplemento.nombreProducto}</td>
                    <td>${suplemento.precio}</td>
                    <td>
                      <div className="texto-oculto">
                        {suplemento.descripcion}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <ModalLogin
                          objeto={suplemento}
                          idPage="adminSuplementos"
                        />
                        <Button
                          style={{ width: 80 }}
                          variant="danger"
                          onClick={() => eliminarProducto(suplemento._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                        <Button
                          style={{ width: 80 }}
                          variant={suplemento.bloqueado ? "success" : "info"}
                          onClick={
                            suplemento.bloqueado
                              ? () => habilitarProducto(suplemento._id)
                              : () => deshabilitarProducto(suplemento._id)
                          }
                        >
                          {suplemento.bloqueado ? "Habilitar" : "Bloquear"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
          {idPage === "indumentarias" && (
            <>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripcion</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {indumentarias.map((indumentaria) => (
                  <tr
                    key={`${indumentaria.tipoDeProducto}-${indumentaria._id}`}
                  >
                    <td>
                      <div className="texto-oculto-id">{indumentaria._id}</div>
                    </td>
                    <td className="d-flex justify-content-center">
                      <img
                        src={indumentaria.imagen}
                        alt={indumentaria.nombreProducto}
                        style={({ width: 50 }, { height: 50 })}
                      />
                    </td>
                    <td>{indumentaria.nombreProducto}</td>
                    <td>${indumentaria.precio}</td>
                    <td>
                      <div className="texto-oculto">
                        {indumentaria.descripcion}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <ModalLogin
                          objeto={indumentaria}
                          idPage="adminIndumentarias"
                        />
                        <Button
                          style={{ width: 80 }}
                          variant="danger"
                          onClick={() => eliminarProducto(indumentaria._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                        <Button
                          style={{ width: 80 }}
                          variant={indumentaria.bloqueado ? "success" : "info"}
                          onClick={
                            indumentaria.bloqueado
                              ? () => habilitarProducto(indumentaria._id)
                              : () => deshabilitarProducto(indumentaria._id)
                          }
                        >
                          {indumentaria.bloqueado ? "Habilitar" : "Bloquear"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
          {idPage === "clases" && (
            <>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Horario</th>
                  <th>Dia</th>
                  <th>Cupos</th>
                  <th>Descripcion</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {clases.map((clase) => (
                  <tr key={clase._id}>
                    <td>
                      <div className="texto-oculto-id">{clase._id}</div>
                    </td>
                    <td className="d-flex justify-content-center">
                      <img
                        src={clase.imagen}
                        alt={clase.nombreClase}
                        style={({ width: 50 }, { height: 50 })}
                      />
                    </td>
                    <td>{clase.nombreClase}</td>
                    <td>
                      <div style={{ width: 115 }}>{clase.horario}</div>
                    </td>
                    <td>{clase.dia}</td>
                    <td>
                      <div className="text-center">{clase.cuposPorDia}</div>
                    </td>
                    <td>
                      <div className="texto-oculto-clase">
                        {clase.descripcionClase}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <ModalLogin objeto={clase} idPage="adminClases" />
                        <Button
                          style={{ width: 80 }}
                          variant="danger"
                          onClick={() => eliminarClase(clase._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                        <Button
                          style={{ width: 80 }}
                          variant={clase.bloqueado ? "success" : "info"}
                          onClick={
                            clase.bloqueado
                              ? () => habilitarClase(clase._id)
                              : () => deshabilitarClase(clase._id)
                          }
                        >
                          {clase.bloqueado ? "Habilitar" : "Bloquear"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
          {idPage === "usuarios" && (
            <>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>
                      <div className="texto-oculto-id">{usuario._id}</div>
                    </td>
                    <td>{usuario.nombre}</td>
                    <td>
                      <div>{usuario.apellido}</div>
                    </td>
                    <td>{usuario.dni}</td>
                    <td>{usuario.emailUsuario}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <ModalLogin objeto={usuario} idPage="adminUsuarios" />
                        <Button
                          style={{ width: 80 }}
                          variant="danger"
                          onClick={() => eliminarUsuario(usuario._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                        <Button
                          style={{ width: 80 }}
                          variant={usuario.bloqueado ? "success" : "info"}
                          onClick={
                            usuario.bloqueado
                              ? () => habilitarUsuario(usuario._id)
                              : () => deshabilitarUsuario(usuario._id)
                          }
                        >
                          {usuario.bloqueado ? "Habilitar" : "Bloquear"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}

          {idPage === "profes" && (
            <>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Clase</th>
                  <th className="texto-oculto-id">Zona de Musculacion</th>
                  <th>Reseña Academica</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {profes.map((profe) => (
                  <tr key={profe._id}>
                    <td>
                      <div className="texto-oculto-id">{profe._id}</div>
                    </td>
                    <td className="d-flex justify-content-center">
                      <img
                        src={profe.imagen}
                        alt={profe.nombreProfe}
                        style={({ width: 30 }, { height: 40 })}
                      />
                    </td>
                    <td className="texto-oculto-id">{profe.nombreProfe}</td>
                    <td>
                      <div>{profe.clase}</div>
                    </td>
                    <td>
                      <div className="texto-oculto-profe">
                        {profe.zonaDeMusculacion}
                      </div>
                    </td>
                    <td>
                      <div className="texto-oculto-profe">
                        {profe.reseñaAcademica}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <ModalLogin objeto={profe} idPage="adminProfes" />
                        <Button
                          style={{ width: 80 }}
                          variant="danger"
                          onClick={() => eliminarProfe(profe._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                        <Button
                          style={{ width: 80 }}
                          variant={profe.bloqueado ? "success" : "info"}
                          onClick={
                            profe.bloqueado
                              ? () => habilitarProfe(profe._id)
                              : () => deshabilitarProfe(profe._id)
                          }
                        >
                          {profe.bloqueado ? "Habilitar" : "Bloquear"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </Table>
      </Container>
    </>
  );
};

export default TableC;
