import { Container } from "react-bootstrap";
import "../css/MarginTop.css";

const PanelAdministrador = () => {
  return (
    <>
      <Container className="d-flex align-items-center flex-column margin-top-panel-admin">
        <h1 className="mt-3 mb-5">Bienvenido Admin</h1>
        <img
          className="mb-3"
          src="https://seeklogo.com/images/G/golds-gym-round-logo-5D0D94D43D-seeklogo.com.png"
          alt="Logo"
        />
      </Container>
    </>
  );
};

export default PanelAdministrador;
