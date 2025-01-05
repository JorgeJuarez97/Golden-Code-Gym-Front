import { Container } from "react-bootstrap";
import DetallePlanes from "../components/DetallePlanes";
import "../css/MarginTop.css";

const PaginaDetallePlanes = () => {
  return (
    <>
      <Container className="margin-detalle-planes">
        <DetallePlanes />
      </Container>
    </>
  );
};

export default PaginaDetallePlanes;
