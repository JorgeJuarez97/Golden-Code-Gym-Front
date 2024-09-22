import Modal from "react-bootstrap/Modal";
import FormC from "./FormC";

const ModalLogin = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormC idPage="login" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalLogin;
