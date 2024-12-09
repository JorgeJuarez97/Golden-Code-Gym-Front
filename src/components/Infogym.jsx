import Container from "react-bootstrap/Container";
import "../css/Infogym.css";
import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.config";
import CardProductos from "./CardProductos";

const Infogym = () => {
  const [profes, setProfes] = useState([]);

  const getProfes = async () => {
    const profes = await clientAxios.get("/profesgym", configHeaders);
    setProfes(profes.data);
  };

  useEffect(() => {
    getProfes();
  }, []);
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
        <CardProductos idPage="profes" profes={profes} />
      </Container>
    </>
  );
};

export default Infogym;
