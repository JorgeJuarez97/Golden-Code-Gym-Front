import Modal from "react-bootstrap/Modal";
import FormC from "./FormC";
import { useLocation } from "react-router-dom";

const ModalLogin = ({
  show,
  handleClose,
  producto,
  setProductos,
  productos,
}) => {
  const location = useLocation();
  const isAdminPage =
    location.pathname === "/paneladministrador" ||
    location.pathname === "/listaproductos/suplementos" ||
    location.pathname === "/listaproductos/indumentarias";

  const tituloModal = producto ? "Editar Producto" : "Agregar Producto";

  return (
    <>
      {isAdminPage ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{tituloModal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormC
              idPage="admin"
              producto={producto}
              setProductos={setProductos}
              productos={productos}
              handleClose={handleClose}
            />
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar Sesion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormC idPage="login" />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ModalLogin;
