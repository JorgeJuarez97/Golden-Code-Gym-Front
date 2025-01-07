import Carousel from "react-bootstrap/Carousel";
import "../css/CarouselC.css";

function CarouselC() {
  return (
    <>
      <Carousel className="carousel-gym">
        <Carousel.Item className="carousel-gym">
          <img
            className="imagen-carousel"
            src="https://res.cloudinary.com/dyd8k74ic/image/upload/v1736186657/ejercicios-perder-peso_rdjm82.jpg"
            alt="imagen rutina"
          />
          <Carousel.Caption>
            <h3>Entrenamientos Personalizados</h3>
            <p>
              Optimiza tus resultados con rutinas adaptadas a tus metas. Varía
              entre fuerza, cardio y flexibilidad para mantener el progreso.
              ¡Sigue avanzando hacia tus objetivos!
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carousel-gym">
          <img
            className="imagen-carousel"
            src="https://res.cloudinary.com/dyd8k74ic/image/upload/v1736186706/Banner-2-Supergains_pc1wqp.jpg"
            alt="imagen productos"
          />
          <Carousel.Caption>
            <h3>Suplementación Inteligente</h3>
            <p>
              Maximiza tu rendimiento con los suplementos adecuados. Desde
              proteínas hasta BCAA, cada uno complementa tu nutrición para
              alcanzar tu máximo potencial.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carousel-gym">
          <img
            className="imagen-carousel"
            src="https://res.cloudinary.com/dyd8k74ic/image/upload/v1736186735/Imagen-destacada-1024x576_xoasl3.jpg"
            alt="imagen ropa"
          />
          <Carousel.Caption>
            <h3>Equipamiento Deportivo</h3>
            <p>
              Viste cómodo y con estilo. La ropa adecuada mejora tu rendimiento,
              te mantiene fresco y evita lesiones durante el entrenamiento.
              ¡Luce bien y entrena mejor!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CarouselC;
