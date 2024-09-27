import { useState } from "react";
import { Button } from "react-bootstrap";
import "../css/TextoExpandido.css";

const TextoExpandido = ({ texto, maxLength }) => {
  const [isExpandido, setIsExpandido] = useState(false);

  if (texto.length <= maxLength) {
    return <p>{texto}</p>;
  }

  const botonExpandido = () => {
    setIsExpandido(!isExpandido);
  };

  return (
    <>
      <div>
        <p
          style={{
            whiteSpace: isExpandido ? "normal" : "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {isExpandido ? texto : texto.substring(0, maxLength) + "..."}
        </p>
        <Button
          className="boton-ver-mas"
          onClick={botonExpandido}
          variant="warning"
        >
          {isExpandido ? "Ver menos" : "Ver más"}
        </Button>
      </div>
    </>
  );
};

export default TextoExpandido;
