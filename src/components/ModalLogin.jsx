import Modal from "react-bootstrap/Modal";
import FormC from "./FormC";
import { useState } from "react";
import { Button } from "react-bootstrap";

const ModalLogin = ({
  show,
  setShowModalLogin,
  handleCloseLogin,
  objeto,
  idPage,
  getUsuarios,
  getProfes,
  getClases,
  getIndumentarias,
  getSuplementos,
  getPlanes,
}) => {
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShow = () => setShowModalEditar(true);
  const handleClose = () => setShowModalEditar(false);

  const [showModalReserva, setShowModalReserva] = useState(false);

  const handleShowReserva = () => setShowModalReserva(true);
  const handleCloseReserva = () => setShowModalReserva(false);

  const [showAgregarModal, setShowAgregarModal] = useState(false);

  const handleShowAgregarModal = () => setShowAgregarModal(true);
  const handleCloseAgregarModal = () => setShowAgregarModal(false);

  return (
    <>
      {idPage === "adminSuplementos" && (
        <>
          <Button
            style={{ width: 80 }}
            variant="warning"
            onClick={() => handleShow()}
          >
            Editar
          </Button>
          <Modal show={showModalEditar} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminSuplementos"
                productos={objeto}
                getSuplementos={getSuplementos}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminIndumentarias" && (
        <>
          <Button
            style={{ width: 80 }}
            variant="warning"
            onClick={() => handleShow()}
          >
            Editar
          </Button>
          <Modal show={showModalEditar} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminIndumentarias"
                productos={objeto}
                getIndumentarias={getIndumentarias}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminClases" && (
        <>
          <Button
            style={{ width: 80 }}
            variant="warning"
            onClick={() => handleShow()}
          >
            Editar
          </Button>
          <Modal show={showModalEditar} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Clase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminClases"
                clases={objeto}
                getClases={getClases}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminUsuarios" && (
        <>
          <Button
            style={{ width: 80 }}
            variant="warning"
            onClick={() => handleShow()}
          >
            Editar
          </Button>
          <Modal show={showModalEditar} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminUsuarios"
                usuarios={objeto}
                getUsuarios={getUsuarios}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminProfes" && (
        <>
          <Button
            style={{ width: 80 }}
            variant="warning"
            onClick={() => handleShow()}
          >
            Editar
          </Button>
          <Modal show={showModalEditar} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Profesor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminProfes"
                profes={objeto}
                getProfes={getProfes}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminPlanes" && (
        <>
          <Button
            style={{ width: 80 }}
            variant="warning"
            onClick={() => handleShow()}
          >
            Editar
          </Button>
          <Modal show={showModalEditar} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminPlanes"
                planes={objeto}
                getPlanes={getPlanes}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminCrearProfes" && (
        <>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => handleShowAgregarModal()}
          >
            Crear Profesor
          </Button>
          <Modal show={showAgregarModal} onHide={handleCloseAgregarModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nuevo Profesor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminCrearProfes"
                getProfes={getProfes}
                handleCloseAgregarModal={handleCloseAgregarModal}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminCrearClases" && (
        <>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => handleShowAgregarModal()}
          >
            Crear Clase
          </Button>
          <Modal show={showAgregarModal} onHide={handleCloseAgregarModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nueva Clase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminCrearClases"
                getClases={getClases}
                handleCloseAgregarModal={handleCloseAgregarModal}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminCrearIndumentarias" && (
        <>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => handleShowAgregarModal()}
          >
            Crear Producto
          </Button>
          <Modal show={showAgregarModal} onHide={handleCloseAgregarModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nuevo Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminCrearIndumentarias"
                getIndumentarias={getIndumentarias}
                handleCloseAgregarModal={handleCloseAgregarModal}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminCrearSuplementos" && (
        <>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => handleShowAgregarModal()}
          >
            Crear Producto
          </Button>
          <Modal show={showAgregarModal} onHide={handleCloseAgregarModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nuevo Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminCrearSuplementos"
                getSuplementos={getSuplementos}
                handleCloseAgregarModal={handleCloseAgregarModal}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminCrearUsuarios" && (
        <>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => handleShowAgregarModal()}
          >
            Crear Usuario
          </Button>
          <Modal show={showAgregarModal} onHide={handleCloseAgregarModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminCrearUsuarios"
                getUsuarios={getUsuarios}
                handleCloseAgregarModal={handleCloseAgregarModal}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "adminCrearPlanes" && (
        <>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => handleShowAgregarModal()}
          >
            Crear Plan
          </Button>
          <Modal show={showAgregarModal} onHide={handleCloseAgregarModal}>
            <Modal.Header closeButton>
              <Modal.Title>Nuevo Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="adminCrearPlanes"
                getPlanes={getPlanes}
                handleCloseAgregarModal={handleCloseAgregarModal}
              />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "reserva" ? (
        <>
          <Button
            className="boton-plan"
            variant="warning"
            onClick={() => handleShowReserva()}
          >
            Reservar Cupo
          </Button>
          <Modal show={showModalReserva} onHide={handleCloseReserva}>
            <Modal.Header closeButton>
              <Modal.Title>Reservar cupo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC
                idPage="reserva"
                clases={objeto}
                handleCloseReserva={handleCloseReserva}
                getClases={getClases}
                setShowModalLogin={setShowModalLogin}
                setShowModalReserva={setShowModalReserva}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <Modal show={show} onHide={handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar Sesion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormC
              idPage="login"
              clases={objeto}
              setShowModalLogin={setShowModalLogin}
              handleCloseLogin={handleCloseLogin}
              show={handleShow}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ModalLogin;
