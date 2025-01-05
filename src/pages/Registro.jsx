import { Container } from "react-bootstrap";
import FormC from "../components/FormC";
import "../css/MarginTop.css";

const Registro = ({ setShowModalLogin }) => {
  return (
    <>
      <Container className="margin-top-registro">
        <FormC idPage="registro" setShowModalLogin={setShowModalLogin} />
      </Container>
    </>
  );
};

export default Registro;
