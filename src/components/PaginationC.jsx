import Pagination from "react-bootstrap/Pagination";

const PaginationC = ({ totalPaginas, paginaActual, cambiarPagina }) => {
  let items = [];

  for (let number = 1; number <= totalPaginas; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === paginaActual}
        onClick={() => cambiarPagina(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </div>
    </>
  );
};

export default PaginationC;
