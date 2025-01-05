import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer container-fluid">
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
            <Link className="enlace" to="/error404">
              Politicas de privacidad
            </Link>
            <Link className="enlace" to="/error404">
              Administrar Cookies
            </Link>
            <Link className="enlace" to="/error404">
              Info
            </Link>
            <Link className="enlace" to="/error404">
              Ayuda
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
