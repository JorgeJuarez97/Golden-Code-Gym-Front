import { Card, Col, Container, Image, Row } from "react-bootstrap";
import "../css/PaginaSobreNosotros.css";
import { imagenesGym } from "../helpers/imagenes";

const PaginaSobreNosotros = () => {
  const imagenGym = imagenesGym;

  return (
    <>
      <Container className="contenedor-sobre-nosotros">
        <div>
          <h2 className="text-center">Introducción</h2>
          <p className="texto-sobre-nosotros text-center mt-3">
            "Golden Code Gym nació con una visión clara: proporcionar un espacio
            donde las personas puedan alcanzar su mejor versión física y mental.
            Nos apasiona el fitness, la salud y el bienestar, y trabajamos todos
            los días para ofrecer un entorno motivador donde puedas superar tus
            límites."
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-center">Misión y Visión</h2>
          <p className="texto-sobre-nosotros text-center mt-3">
            "Nuestra misión es brindar el mejor servicio en fitness, ayudando a
            cada miembro a mejorar su calidad de vida a través de programas de
            entrenamiento personalizados, asesoramiento experto y un ambiente de
            comunidad."
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-center">Historia del Gimnasio</h2>
          <p className="texto-sobre-nosotros text-center mt-3">
            "Golden Code Gym abrió sus puertas en 2010 con el objetivo de
            ofrecer algo más que un lugar para entrenar. Queríamos crear una
            comunidad donde las personas pudieran encontrar motivación, amistad
            y apoyo. Desde nuestros humildes comienzos, hemos crecido gracias a
            la dedicación de nuestro equipo y el compromiso de nuestros
            miembros."
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-center">Valores de la Empresa</h2>
          <div className="texto-sobre-nosotros mt-3">
            <ul>
              <li className="my-3">
                <strong>Compromiso con la calidad: </strong>
                Nos esforzamos por ofrecer instalaciones y equipos de primera
                calidad.
              </li>
              <li className="my-3">
                <strong>Disciplina y superación: </strong>
                Creemos que con esfuerzo y constancia, cualquier meta es
                alcanzable.
              </li>
              <li className="my-3">
                <strong>Inclusión y comunidad: </strong>
                Nuestro gimnasio es un espacio para todos, sin importar su nivel
                de condición física.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-center">Instalaciones y Equipamiento</h2>
          <p className="texto-sobre-nosotros text-center mt-3">
            "Nuestras instalaciones están diseñadas pensando en tu comodidad y
            progreso. Desde equipos de musculación de última generación hasta
            salas de clases grupales como zumba, spinning, y yoga, Golden Code
            Gym tiene todo lo que necesitas para entrenar a tu máximo nivel."
          </p>
          <Container className="mt-4">
            <Row className="g-3">
              {imagenGym.map((imagen) => (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className="d-flex justify-content-center"
                  key={imagen.id}
                >
                  <Card className="imagen-sobre-nosotros">
                    <Card.Img
                      className="imagen-sobre-nosotros"
                      src={imagen.urlImagen}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        <div className="mt-5">
          <p className="texto-sobre-nosotros text-center texto-final">
            "Únete a Golden Code Gym hoy y descubre todo lo que puedes lograr
            con el apoyo de un equipo de profesionales y una comunidad que te
            inspira a ser tu mejor versión. ¡Te esperamos!"
          </p>
        </div>
      </Container>
    </>
  );
};

export default PaginaSobreNosotros;
