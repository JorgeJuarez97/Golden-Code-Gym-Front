import { Route, Routes } from "react-router-dom";
import NavbarC from "../components/NavbarC";
import Footer from "../components/Footer";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import Registro from "../pages/Registro";
import Suplementos from "../pages/Suplementos";
import Indumentaria from "../pages/Indumentaria";
import PaginaDetallePlanes from "../pages/PaginaDetallePlanes";
import Clases from "../pages/Clases";
import DetalleProducto from "../pages/DetalleProducto";
import CarritoPage from "../pages/Carrito";
import PanelAdministrador from "../pages/PanelAdministrador";
import ListaProductos from "../pages/ListaProductos";
import PaginaContacto from "../pages/PaginaContacto";
import PaginaSobreNosotros from "../pages/PaginaSobreNosotros";

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <main>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/suplementos" element={<Suplementos />} />
          <Route path="/indumentarias" element={<Indumentaria />} />
          <Route
            path="/paginadetalleplanes/:planId"
            element={<PaginaDetallePlanes />}
          />
          <Route path="/clases" element={<Clases />} />
          <Route
            path="/detalleproducto/:tipo/:productoId"
            element={<DetalleProducto />}
          />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/paneladministrador" element={<PanelAdministrador />} />
          <Route path="/listaproductos/:tipo" element={<ListaProductos />} />
          <Route path="/paginacontacto" element={<PaginaContacto />} />
          <Route
            path="/paginasobrenosotros"
            element={<PaginaSobreNosotros />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default RoutesViews;
