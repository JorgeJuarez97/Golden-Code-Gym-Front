import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../css/DetallePlanes.css";
import FormC from "../components/FormC";

const DetallePlanes = () => {
  const { planId } = useParams();

  const planes = {
    musculacion: {
      titulo: "PLAN MUSCULACION",
      descripcion:
        "Este plan está diseñado para aquellos que desean enfocarse en la ganancia de fuerza y el aumento de masa muscular. Con acceso a la zona de musculación equipada con los últimos aparatos de alta tecnología, este plan te permitirá realizar rutinas intensas de levantamiento de pesas, entrenamiento de resistencia y ejercicios específicos para hipertrofia muscular. Ideal para quienes buscan mejorar su físico, desarrollar fuerza, y esculpir su cuerpo de manera progresiva.",
    },
    clases: {
      titulo: "PLAN CLASES",
      descripcion:
        "Si lo que buscas es una forma divertida y dinámica de mantenerte activo, el plan de clases es ideal para ti. Incluye una amplia variedad de clases como zumba, spinning, yoga, boxeo, y más. Estas clases no solo te ayudarán a quemar calorías y mejorar tu condición física, sino que también serán una excelente manera de relajarte y desconectar del estrés diario. El cardio intenso de nuestras clases de spinning y zumba es perfecto para mejorar tu resistencia, mientras que el yoga te proporcionará relajación y equilibrio mental.",
    },
    full: {
      titulo: "PLAN FULL",
      descripcion:
        "Con el plan Full tendrás acceso completo a todas las áreas del gimnasio. Este plan es perfecto para quienes buscan un enfoque integral en su entrenamiento. Podrás disfrutar tanto de la zona de musculación para la ganancia de fuerza y masa muscular, como de las clases grupales de alta intensidad, ideales para quemar calorías y mantenerte activo. Ya sea que quieras desarrollar músculo, perder grasa, o simplemente relajarte con una clase de yoga, este plan te ofrece la flexibilidad para combinar diferentes entrenamientos y lograr el balance perfecto entre fuerza, resistencia y bienestar.",
    },
  };

  const planSeleccionado = planes[planId];

  return (
    <>
      <Container className="mb-5">
        <h1 className="text-center mt-4 mb-4">
          {planSeleccionado ? planSeleccionado.titulo : "Plan no encontrado"}
        </h1>
        <p className="descripcion-plan">
          {planSeleccionado
            ? planSeleccionado.descripcion
            : "Descripcion no disponible"}
        </p>
        <p className="texto-asesorar">
          Para asesorarte mejor debes llenar este formulario asi nos pondremos
          en contacto contigo para detallarte mas sobre los planes y los medios
          de pago. Muchas gracias por confiar en Golden Code Gym.
        </p>
      </Container>
      <FormC idPage="planes" />
    </>
  );
};

export default DetallePlanes;
