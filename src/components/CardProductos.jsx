import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/Planes.css";
import TextoExpandido from "./TextoExpandido";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const CardProductos = ({ idPage }) => {
  const suplementos = [
    {
      id: 1,
      nombre: "TrueMade Whey Protein",
      descripcion:
        "Proteína de suero ultra filtrada para promover el crecimiento muscular y una rápida recuperación después del ejercicio. Ideal para atletas y personas activas que buscan mejorar su rendimiento.",
      precio: 22150,
      imagen:
        "https://www.enasport.com/cdn/shop/files/7792981060021_2_f1b5bea7-4b41-47cc-acd7-c855169e2cb7.jpg?v=1715602195&width=1200",
    },
    {
      id: 2,
      nombre: "Creatina Micronizada",
      descripcion:
        "Creatina de alta pureza diseñada para aumentar la fuerza y el rendimiento físico en entrenamientos intensos. Micronizada para una mejor absorción.",
      precio: 18590,
      imagen:
        "https://www.enasport.com/cdn/shop/files/Ena_creatinamicronizada_1000x1000_6da5cbe7-ed4a-4125-8e31-d2b77ee57399.png?v=1706886860&width=1000",
    },
    {
      id: 3,
      nombre: "Whey Protein",
      descripcion:
        "Suplemento de proteína de suero de leche, excelente para el desarrollo muscular, mejorar la recuperación y mantener una nutrición adecuada para los deportistas.",
      precio: 36900,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/279/419/products/scimmia-671-c747687798f488e65316802076583550-1024-1024.png",
    },
    {
      id: 4,
      nombre: "Creatina Micronizada",
      descripcion:
        "Creatina en polvo de rápida disolución, ideal para incrementar la energía y potencia muscular durante actividades de alta intensidad.",
      precio: 32525,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/446/474/products/1636989941475-cf5a19930779ebd04916373583067560-640-0.png",
    },
    {
      id: 5,
      nombre: "Whey Pro",
      descripcion:
        "Fórmula avanzada de proteína de suero que ayuda a desarrollar masa muscular magra y a acelerar la recuperación post-entrenamiento.",
      precio: 14500,
      imagen:
        "https://acdn.mitiendanube.com/stores/002/956/718/products/whey-pro-1kg-frutilla1-2cf281268c82977eec16803906045939-1024-1024.jpg",
    },
    {
      id: 6,
      nombre: "Crea Shock",
      descripcion:
        "Suplemento pre-entreno con creatina, diseñado para maximizar la energía y resistencia en entrenamientos de alta intensidad, con una fórmula que ayuda a reducir la fatiga.",
      precio: 13700,
      imagen:
        "https://acdn.mitiendanube.com/stores/996/230/products/diseno-sin-titulo-13-07612f9753a8aaafae17077954249275-1024-1024.png",
    },
  ];

  const indumentarias = [
    {
      id: 1,
      nombre: "Remeron Oversize Essential",
      descripcion:
        "Remera de estilo oversize, cómoda y moderna, perfecta para un look casual en el gimnasio o para usar en el día a día.",
      precio: 29999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/44-7238e44bddb437ef4f17270440132807-1024-1024.webp",
    },
    {
      id: 2,
      nombre: "Pantalón Jogging",
      descripcion:
        "Pantalón de jogging cómodo y versátil, ideal para entrenamientos o para usar en momentos de relax, con un diseño deportivo y ajuste flexible.",
      precio: 52999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/4-fddd16a52a264c483f17268354616998-1024-1024.webp",
    },
    {
      id: 3,
      nombre: "Buzo Oversize",
      descripcion:
        "Buzo estilo oversize, confeccionado con materiales suaves y de alta calidad. Perfecto para mantener el estilo mientras te mantienes abrigado.",
      precio: 61999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/4325453-20c16438fb983d8e6f17268354811331-640-0.webp",
    },
    {
      id: 4,
      nombre: "Musculosa Hook",
      descripcion:
        " Musculosa deportiva con diseño ergonómico, ideal para entrenamientos intensos. Permite una gran libertad de movimiento y máxima transpirabilidad.",
      precio: 23999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/back-48676c166bd17d779517266622540905-640-0.webp",
    },
    {
      id: 5,
      nombre: "Pantalón Short",
      descripcion:
        "Short deportivo diseñado para entrenamientos, ofreciendo comodidad y flexibilidad para actividades físicas intensas.",
      precio: 24999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/77-f8dedd91670809f54f17269480668930-640-0.webp",
    },
    {
      id: 6,
      nombre: "Remera Slim Fit",
      descripcion:
        "Remera ajustada de estilo moderno, perfecta para quienes buscan una prenda cómoda y con estilo, tanto dentro como fuera del gimnasio.",
      precio: 23999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/99-95293bd87f38da9e6e17269479469426-640-0.webp",
    },
  ];

  const clases = [
    {
      id: 1,
      nombre: "Zumba",
      descripcion:
        "Una clase de baile fitness que mezcla movimientos de alta energía con ritmos latinos, ideal para quemar calorías y mejorar la coordinación mientras te diviertes. Profesor: Sofía Martínez",
      imagen:
        "https://fotografias.larazon.es/clipping/cmsimages01/2022/08/15/595015CE-A41C-4105-95A3-458E3279105A/98.jpg?crop=1095,616,x0,y49&width=1900&height=1069&optimize=low&format=webply",
    },
    {
      id: 2,
      nombre: "Spinning",
      descripcion:
        "Ejercicio cardiovascular intenso sobre una bicicleta fija, donde trabajarás la resistencia y mejorarás tu salud cardiovascular mientras fortaleces piernas y glúteos. Profesor: Valentina Gómez",
      imagen:
        "https://d1heoihvzm7u4h.cloudfront.net/3d813cf95216acb3eb15d8db8ee4e58da4ac3fa6_65_Spinning3200x1560px.jpg",
    },
    {
      id: 3,
      nombre: "Yoga",
      descripcion:
        "Combina posturas físicas con respiración controlada para mejorar la flexibilidad, el equilibrio y reducir el estrés, logrando un estado de relajación y bienestar. Profesor: Camila Rojas",
      imagen:
        "https://www.webconsultas.com/sites/default/files/styles/wch_image_schema/public/temas/yoga.jpg",
    },
    {
      id: 4,
      nombre: "Funcional",
      descripcion:
        "Entrenamiento usando pesas, bandas o el propio peso corporal, ideal para mejorar la fuerza y agilidad en actividades cotidianas. Profesor: Lucas Fernández y Matías Gutiérrez",
      imagen:
        "https://www.universidaddeldeporte.com/wp-content/uploads/2021/09/entrenamiento_funcional.png",
    },
    {
      id: 5,
      nombre: "Boxeo",
      descripcion:
        "Ejercicio intenso que combina golpes y técnicas de defensa, ideal para mejorar tu coordinación, resistencia cardiovascular y liberar estrés. Profesor: Diego Pérez",
      imagen:
        "https://mercadofitness.com/wp-content/uploads/2022/12/La-cadena-de-gimnasios-Title-Boxing-Club-expandira-su-franquicia-a-9-paises.jpeg",
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("suplementos")) {
      localStorage.setItem("suplementos", JSON.stringify(suplementos));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("indumentarias")) {
      localStorage.setItem("indumentarias", JSON.stringify(indumentarias));
    }
  }, []);

  return (
    <>
      <Container>
        <Row className="contenedor-plan">
          {idPage === "suplementos" &&
            suplementos.map((suplemento) => (
              <Col xs={12} md={6} lg={4} className="plan" key={suplemento.id}>
                <Card className="info-cuerpo producto">
                  <Link to={`/detalleproducto/suplemento/${suplemento.id}`}>
                    <Card.Img
                      className="imagen-producto"
                      variant="top"
                      src={suplemento.imagen}
                    />
                  </Link>
                  <Card.Body className="cuerpo-producto">
                    <Card.Title className="titulo-plan titulo-producto">
                      {suplemento.nombre}
                    </Card.Title>
                    <Card.Text className="precio-producto">
                      ${suplemento.precio}
                    </Card.Text>
                    <div className="boton-añadir-carrito">
                      <Button className="boton-plan" variant="warning">
                        Añadir al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          {idPage === "indumentaria" &&
            indumentarias.map((indumentaria) => (
              <Col xs={12} md={6} lg={4} className="plan" key={indumentaria.id}>
                <Card className="info-cuerpo producto">
                  <Link to={`/detalleproducto/indumentaria/${indumentaria.id}`}>
                    <Card.Img
                      className="imagen-producto"
                      variant="top"
                      src={indumentaria.imagen}
                    />
                  </Link>
                  <Card.Body className="cuerpo-producto">
                    <Card.Title className="titulo-plan titulo-producto">
                      {indumentaria.nombre}
                    </Card.Title>
                    <Card.Text className="precio-producto">
                      ${indumentaria.precio}
                    </Card.Text>
                    <div className="boton-añadir-carrito">
                      <Button className="boton-plan" variant="warning">
                        Añadir al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          {idPage === "clases" &&
            clases.map((clase) => (
              <Col xs={12} md={6} lg={4} className="plan" key={clase.id}>
                <Card className="info-cuerpo clase">
                  <Card.Img
                    className="imagen-clase"
                    variant="top"
                    src={clase.imagen}
                  />
                  <Card.Body className="cuerpo-producto">
                    <Card.Title className="titulo-plan titulo-producto">
                      {clase.nombre}
                    </Card.Title>
                    <Card.Text>
                      <TextoExpandido
                        texto={clase.descripcion}
                        maxLength={30}
                      />
                    </Card.Text>
                    <div className="boton-añadir-carrito">
                      <Button className="boton-plan" variant="warning">
                        Sacar Turno
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default CardProductos;
