import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/Planes.css";

const CardProductos = ({ idPage }) => {
  const suplementos = [
    {
      id: 1,
      nombre: "TrueMade Whey Protein",
      precio: 22150,
      imagen:
        "https://www.enasport.com/cdn/shop/files/7792981060021_2_f1b5bea7-4b41-47cc-acd7-c855169e2cb7.jpg?v=1715602195&width=1200",
    },
    {
      id: 2,
      nombre: "Creatina Micronizada",
      precio: 18590,
      imagen:
        "https://www.enasport.com/cdn/shop/files/Ena_creatinamicronizada_1000x1000_6da5cbe7-ed4a-4125-8e31-d2b77ee57399.png?v=1706886860&width=1000",
    },
    {
      id: 3,
      nombre: "Whey Protein",
      precio: 36900,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/279/419/products/scimmia-671-c747687798f488e65316802076583550-1024-1024.png",
    },
    {
      id: 4,
      nombre: "Creatina Micronizada",
      precio: 32525,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/446/474/products/1636989941475-cf5a19930779ebd04916373583067560-640-0.png",
    },
    {
      id: 5,
      nombre: "Whey Pro",
      precio: 14500,
      imagen:
        "https://acdn.mitiendanube.com/stores/002/956/718/products/whey-pro-1kg-frutilla1-2cf281268c82977eec16803906045939-1024-1024.jpg",
    },
    {
      id: 6,
      nombre: "Crea Shock",
      precio: 13700,
      imagen:
        "https://acdn.mitiendanube.com/stores/996/230/products/diseno-sin-titulo-13-07612f9753a8aaafae17077954249275-1024-1024.png",
    },
  ];

  const indumentarias = [
    {
      id: 1,
      nombre: "Remeron Oversize Essential",
      precio: 29999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/44-7238e44bddb437ef4f17270440132807-1024-1024.webp",
    },
    {
      id: 2,
      nombre: "Pantalón Jogging",
      precio: 52999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/4-fddd16a52a264c483f17268354616998-1024-1024.webp",
    },
    {
      id: 3,
      nombre: "Buzo Oversize",
      precio: 61999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/4325453-20c16438fb983d8e6f17268354811331-640-0.webp",
    },
    {
      id: 4,
      nombre: "Musculosa Hook",
      precio: 23999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/back-48676c166bd17d779517266622540905-640-0.webp",
    },
    {
      id: 5,
      nombre: "Pantalón Short",
      precio: 24999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/77-f8dedd91670809f54f17269480668930-640-0.webp",
    },
    {
      id: 6,
      nombre: "Remera Slim Fit",
      precio: 23999,
      imagen:
        "https://acdn.mitiendanube.com/stores/001/511/342/products/99-95293bd87f38da9e6e17269479469426-640-0.webp",
    },
  ];

  return (
    <>
      <Container>
        <Row className="contenedor-plan">
          {idPage === "suplementos" &&
            suplementos.map((suplemento) => (
              <Col xs={12} md={6} lg={4} className="plan" key={suplemento.id}>
                <Card className="info-cuerpo producto">
                  <Card.Img
                    className="imagen-producto"
                    variant="top"
                    src={suplemento.imagen}
                  />
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
                  <Card.Img
                    className="imagen-producto"
                    variant="top"
                    src={indumentaria.imagen}
                  />
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
        </Row>
      </Container>
    </>
  );
};

export default CardProductos;
