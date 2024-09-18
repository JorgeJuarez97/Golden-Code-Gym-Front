import Container from "react-bootstrap/Container";
import "../css/Footer.css";

const Footer = () => {
  return (
    <>
      <Container fluid className="footer">
        <div className="footer-copy">
          <div className="copy">
            &copy; 2024 Golden Code Gym | Todos los derechos reservados.
          </div>
          <div className="contacto">
            <strong>Contacto:</strong> goldencodegym@gmail.com
          </div>
        </div>
        <div className="footer-links">
          <div className="redes">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-youtube"></i>
            </a>
            <a
              href="https://www.tiktok.com/es/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-tiktok"></i>
            </a>
            <a
              href="https://www.instagram.com/accounts/login/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </div>
          <div className="politicas">
            <a href="./Paginas/error404.html">Politicas de privacidad</a>
            <a href="./Paginas/error404.html">Administrar Cookies</a>
            <a href="./Paginas/error404.html">Info</a>
            <a href="./Paginas/error404.html">Ayuda</a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Footer;
