import Modal from "react-bootstrap/Modal";
import FormC from "./FormC";
import { useState } from "react";
import { Button } from "react-bootstrap";

const ModalLogin = ({ show, setShowModalLogin, objeto, idPage }) => {
  const tituloModal = objeto ? "Editar Producto" : "Agregar Producto";

  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShow = () => setShowModalEditar(true);
  const handleClose = () => setShowModalEditar(false);

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
              <Modal.Title>{tituloModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC idPage="adminSuplementos" suplementos={objeto} />
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
              <Modal.Title>{tituloModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC idPage="adminIndumentarias" indumentarias={objeto} />
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
              <Modal.Title>{tituloModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC idPage="adminClases" clases={objeto} />
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
              <Modal.Title>{tituloModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC idPage="adminUsuarios" usuarios={objeto} />
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
              <Modal.Title>{tituloModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormC idPage="adminProfes" profes={objeto} />
            </Modal.Body>
          </Modal>
        </>
      )}

      {idPage === "user" ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reservar cupo para {nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormC idPage="reserva" />
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar Sesion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormC idPage="login" setShowModalLogin={setShowModalLogin} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ModalLogin;
