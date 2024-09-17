import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../css/Infogym.css";

const Infogym = () => {
  return (
    <>
      <Container className="contenedor-info">
        <div>
          <p className="text-center titulo-bienvenida">
            <strong>¡Bienvenidos a Golden Code Gym!</strong>
          </p>
        </div>
        <p>
          En Golden Code Gym, nos enfocamos en brindarte una experiencia de
          entrenamiento completa y de calidad. Ofrecemos una amplia variedad de
          clases, como
          <strong> zumba, spinning, yoga, funcional y boxeo,</strong> para que
          encuentres la actividad que mejor se adapte a tus gustos y
          necesidades. Nuestra zona de musculación cuenta con aparatos nuevos y
          de la más alta tecnología, diseñados para optimizar tu rendimiento y
          ayudarte a alcanzar tus metas de manera segura y eficiente. Además,
          trabajamos con las mejores marcas de suplementación como
          <strong> ENA, StarNutrition, Strength, ON, Nutrilab,</strong> y
          ofrecemos ropa deportiva de <strong>Nike</strong> para que siempre
          entrenes con lo mejor. Por supuesto, contamos con un equipo de
          profesores altamente calificados y expertos en salud y entrenamiento,
          siempre dispuestos a guiarte con la mejor predisposición y atención
          personalizada. En Golden Code Gym, estamos comprometidos con tu
          bienestar. ¡Ven y forma parte de nuestra comunidad fitness!
        </p>
      </Container>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={4} className="info">
            <Card className="info-cuerpo">
              <Card.Img
                variant="top"
                src="https://img.freepik.com/fotos-premium/retrato-entrenador-personal-sosteniendo-portapapeles-plan-entrenamiento-gimnasio_629665-1942.jpg"
              />
              <Card.Body>
                <Card.Title>Lucas Fernández</Card.Title>
                <Card.Text>
                  <strong>Clase:</strong> Funcional <br />
                  <strong>Zona de Musculación:</strong> Entrenamiento de
                  Resistencia <br />
                  <strong>Reseña Académica:</strong> Licenciado en Educación
                  Física, especializado en entrenamiento funcional y
                  musculación. Con más de 5 años de experiencia, Lucas se
                  destaca por su capacidad para diseñar rutinas de alto
                  rendimiento adaptadas a cada nivel.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="info">
            <Card className="info-cuerpo">
              <Card.Img
                variant="top"
                src="https://img.freepik.com/foto-gratis/deportista-pasar-tiempo-gimnasio-manana_1157-28936.jpg?size=626&ext=jpg"
              />
              <Card.Body>
                <Card.Title>Matías Gutiérrez</Card.Title>
                <Card.Text>
                  <strong>Clase:</strong> Funcional <br />
                  <strong>Zona de Musculación:</strong> Zona de Brazos y Espalda
                  <br />
                  <strong>Reseña Académica:</strong> Graduado en Nutrición
                  Deportiva y Entrenamiento Personal, Matías tiene
                  certificaciones en entrenamiento funcional y musculación. Su
                  experiencia de 5 años en el ámbito del fitness lo convierte en
                  un experto en rutinas de alta intensidad.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="info">
            <Card className="info-cuerpo">
              <Card.Img
                variant="top"
                src="https://img.freepik.com/fotos-premium/hombre-adulto-mediana-edad-expresion-feliz-concepto-profesor-fitness-gimnasio-generado-ai_1194-574090.jpg"
              />
              <Card.Body>
                <Card.Title>Diego Pérez</Card.Title>
                <Card.Text>
                  <strong>Clase:</strong> Boxeo <br />
                  <strong>Zona de Musculación:</strong> Entrenamiento de Fuerza
                  Explosiva <br />
                  <strong>Reseña Académica:</strong> Diego es entrenador
                  personal con especialización en deportes de combate y
                  acondicionamiento físico. Posee más de 6 años de experiencia,
                  y su enfoque principal es el desarrollo de la fuerza y la
                  potencia muscular.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="info">
            <Card className="info-cuerpo">
              <Card.Img
                variant="top"
                src="https://img.freepik.com/fotos-premium/expresion-feliz-mujer-bonita-adulta-concepto-profesor-fitness-gimnasio-generado-ai_1194-577162.jpg"
              />
              <Card.Body>
                <Card.Title>Camila Rojas</Card.Title>
                <Card.Text>
                  <strong>Clase:</strong> Yoga <br />
                  <strong>Zona de Musculación:</strong> Zona de Flexibilidad y
                  Movilidad
                  <br />
                  <strong>Reseña Académica:</strong> Instructora de Yoga
                  certificada, con un diplomado en biomecánica del cuerpo
                  humano. Camila trabaja no solo en la enseñanza del yoga, sino
                  también en mejorar la movilidad y flexibilidad de sus alumnos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="info">
            <Card className="info-cuerpo">
              <Card.Img
                variant="top"
                src="https://st3.depositphotos.com/1594308/14134/i/950/depositphotos_141347028-stock-photo-female-fitness-instructor.jpg"
              />
              <Card.Body>
                <Card.Title>Sofía Martínez</Card.Title>
                <Card.Text>
                  <strong>Clase:</strong> Zumba
                  <br />
                  <strong>Zona de Musculación:</strong> Zona de Piernas y
                  Glúteos
                  <br />
                  <strong>Reseña Académica:</strong> Graduada en Ciencias del
                  Deporte, Sofía cuenta con certificaciones en Zumba y
                  entrenamiento funcional. Tiene una trayectoria de 4 años en
                  gimnasios, destacándose en clases dinámicas y motivadoras.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="info">
            <Card className="info-cuerpo">
              <Card.Img
                variant="top"
                src="https://img.freepik.com/fotos-premium/entrenador-personal-fitness-femenino-joven-bloc-notas-pie-gimnasio-pulgar-arriba_146671-31563.jpg"
              />
              <Card.Body>
                <Card.Title>Valentina Gómez</Card.Title>
                <Card.Text>
                  <strong>Clase:</strong> Spinning <br />
                  <strong>Zona de Musculación:</strong> Cardio y Zona de Abdomen
                  <br />
                  <strong>Reseña Académica:</strong> Especialista en
                  Entrenamiento Deportivo, con certificación internacional en
                  ciclismo indoor. Valentina combina su pasión por el spinning
                  con su enfoque en la mejora de la resistencia física y
                  cardiovascular.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Infogym;
