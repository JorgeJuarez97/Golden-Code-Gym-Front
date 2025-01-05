import { Container } from "react-bootstrap";
import "../css/MarginTop.css";
import "../css/MarginBottom.css";
import "../css/Error404.css";

const Error404 = () => {
  return (
    <>
      <Container fluid className="margin-top-error margin-bottom-error">
        <img
          className="imagen-error"
          src="https://edteam-media.s3.amazonaws.com/blogs/big/2ab53939-9b50-47dd-b56e-38d4ba3cc0f0.png"
          alt=""
        />
      </Container>
    </>
  );
};

export default Error404;
