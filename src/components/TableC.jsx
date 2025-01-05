import { Button, Container, Table } from "react-bootstrap";
import "../css/TableC.css";
import ModalLogin from "./ModalLogin";

const TableC = ({
  suplementos,
  indumentarias,
  clases,
  usuarios,
  profes,
  planes,
  eliminarUsuario,
  eliminarProducto,
  eliminarClase,
  eliminarProfe,
  eliminarPlan,
  deshabilitarUsuario,
  habilitarUsuario,
  deshabilitarClase,
  habilitarClase,
  deshabilitarProducto,
  habilitarProducto,
  deshabilitarProfe,
  habilitarProfe,
  deshabilitarPlan,
  habilitarPlan,
  getUsuarios,
  getProfes,
  getClases,
  getIndumentarias,
  getSuplementos,
  getPlanes,
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
                    <td data-label="ID">
                      <div className="texto-oculto-id">{suplemento._id}</div>
                    </td>
                    <td
                      className="d-flex justify-content-center"
                      data-label="Imagen"
                    >
                      <img
                        src={suplemento.imagen}
                        alt={suplemento.nombreProducto}
                        style={({ width: 50 }, { height: 50 })}
                      />
                    </td>
                    <td data-label="Nombre">{suplemento.nombreProducto}</td>
                    <td data-label="Precio">${suplemento.precio}</td>
                    <td data-label="Descripcion">
                      <div className="texto-oculto">
                        {suplemento.descripcion}
                      </div>
                    </td>
                    <td data-label="Opciones">
                      <div className="d-flex justify-content-around">
                        <ModalLogin
                          objeto={suplemento}
                          idPage="adminSuplementos"
                          getSuplementos={getSuplementos}
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
                    <td data-label="ID">
                      <div className="texto-oculto-id">{indumentaria._id}</div>
                    </td>
                    <td
                      className="d-flex justify-content-center"
                      data-label="Imagen"
                    >
                      <img
                        src={indumentaria.imagen}
                        alt={indumentaria.nombreProducto}
                        style={({ width: 50 }, { height: 50 })}
                      />
                    </td>
                    <td data-label="Nombre">{indumentaria.nombreProducto}</td>
                    <td data-label="Precio">${indumentaria.precio}</td>
                    <td data-label="Descripcion">
                      <div className="texto-oculto">
                        {indumentaria.descripcion}
                      </div>
                    </td>
                    <td data-label="Opciones">
                      <div className="d-flex justify-content-around">
                        <ModalLogin
                          objeto={indumentaria}
                          idPage="adminIndumentarias"
                          getIndumentarias={getIndumentarias}
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
                    <td data-label="ID">
                      <div className="texto-oculto-id">{clase._id}</div>
                    </td>
                    <td
                      className="d-flex justify-content-center"
                      data-label="Imagen"
                    >
                      <img
                        src={clase.imagen}
                        alt={clase.nombreClase}
                        style={({ width: 50 }, { height: 50 })}
                      />
                    </td>
                    <td data-label="Nombre">{clase.nombreClase}</td>
                    <td data-label="Horario">
                      <div style={{ width: 115 }}>{clase.horario}</div>
                    </td>
                    <td data-label="Dia">{clase.dia}</td>
                    <td data-label="Cupos">
                      <div className="text-center">{clase.cuposPorDia}</div>
                    </td>
                    <td data-label="Descripcion">
                      <div className="texto-oculto-clase">
                        {clase.descripcionClase}
                      </div>
                    </td>
                    <td data-label="Opciones">
                      <div className="d-flex justify-content-around">
                        <ModalLogin
                          objeto={clase}
                          idPage="adminClases"
                          getClases={getClases}
                        />
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
                    <td data-label="ID">
                      <div className="texto-oculto-id">{usuario._id}</div>
                    </td>
                    <td data-label="Nombre">{usuario.nombre}</td>
                    <td data-label="Apellido">
                      <div>{usuario.apellido}</div>
                    </td>
                    <td data-label="DNI">{usuario.dni}</td>
                    <td data-label="Email">{usuario.emailUsuario}</td>
                    <td data-label="Rol">{usuario.rol}</td>
                    <td data-label="Opciones">
                      <div className="d-flex justify-content-around">
                        <ModalLogin
                          objeto={usuario}
                          idPage="adminUsuarios"
                          getUsuarios={getUsuarios}
                        />
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
                    <td data-label="ID">
                      <div className="texto-oculto-id">{profe._id}</div>
                    </td>
                    <td
                      className="d-flex justify-content-center"
                      data-label="Imagen"
                    >
                      <img
                        src={profe.imagen}
                        alt={profe.nombreProfe}
                        style={({ width: 30 }, { height: 40 })}
                      />
                    </td>
                    <td
                      className="texto-oculto-nombre-profe"
                      data-label="Nombre"
                    >
                      {profe.nombreProfe}
                    </td>
                    <td data-label="Clase">
                      <div>{profe.clase}</div>
                    </td>
                    <td data-label="Zona">
                      <div className="texto-oculto-profe">
                        {profe.zonaDeMusculacion}
                      </div>
                    </td>
                    <td data-label="Reseña Acade.">
                      <div className="texto-oculto-profe">
                        {profe.reseñaAcademica}
                      </div>
                    </td>
                    <td data-label="Opciones">
                      <div className="d-flex justify-content-around">
                        <ModalLogin
                          objeto={profe}
                          idPage="adminProfes"
                          getProfes={getProfes}
                        />
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

          {idPage === "planes" && (
            <>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acceso</th>
                  <th>Mensual</th>
                  <th>Descripcion</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {planes.map((plan) => (
                  <tr key={plan._id}>
                    <td data-label="ID">
                      <div className="texto-oculto-id">{plan._id}</div>
                    </td>
                    <td data-label="Nombre">{plan.nombrePlan}</td>
                    <td data-label="Acceso">
                      <div className="texto-oculto">{plan.acceso}</div>
                    </td>
                    <td data-label="Mensual">${plan.cuotaMensual}</td>
                    <td data-label="Descripcion">
                      <div className="texto-oculto">{plan.descripcion}</div>
                    </td>
                    <td data-label="Opciones">
                      <div className="d-flex justify-content-around">
                        <ModalLogin
                          objeto={plan}
                          idPage="adminPlanes"
                          getPlanes={getPlanes}
                        />
                        <Button
                          style={{ width: 80 }}
                          variant="danger"
                          onClick={() => eliminarPlan(plan._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                        <Button
                          style={{ width: 80 }}
                          variant={plan.bloqueado ? "success" : "info"}
                          onClick={
                            plan.bloqueado
                              ? () => habilitarPlan(plan._id)
                              : () => deshabilitarPlan(plan._id)
                          }
                        >
                          {plan.bloqueado ? "Habilitar" : "Bloquear"}
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
