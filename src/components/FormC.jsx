import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/FormC.css";

const FormC = ({ idPage }) => {
  return (
    <>
      <Container
        className={
          idPage === "registro"
            ? "mb-5 mt-3 contenedor-formulario-registro"
            : "contenedor-formulario-login"
        }
      >
        <Form>
          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" />
              <Form.Text className="text-muted">
                Debes ingresar tu nombre
              </Form.Text>
            </Form.Group>
          )}

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="Apellido" />
              <Form.Text className="text-muted">
                Debes ingresar tu apellido
              </Form.Text>
            </Form.Group>
          )}

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted">
                Debes ingresar tu email
              </Form.Text>
            </Form.Group>
          )}

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="number" placeholder="DNI" />
              <Form.Text className="text-muted">
                Debes ingresar su DNI
              </Form.Text>
            </Form.Group>
          )}

          {idPage === "login" && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Usuario" />
              <Form.Text className="text-muted">
                Debes ingresar tu email
              </Form.Text>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Repetir Contraseña" />
            </Form.Group>
          )}

          {idPage === "registro" && (
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Acepto los terminos y condiciones"
              />
            </Form.Group>
          )}

          <div className="contenedor-boton-registro">
            <Button
              className="boton-registro mt-3"
              variant="primary"
              type="submit"
            >
              {idPage === "registro" ? "Registrarse" : "Iniciar"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default FormC;
