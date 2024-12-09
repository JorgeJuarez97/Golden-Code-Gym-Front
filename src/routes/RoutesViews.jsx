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
import ListaProductosSuplementos from "../pages/ListaProductosSuplementos";
import PaginaContacto from "../pages/PaginaContacto";
import PaginaSobreNosotros from "../pages/PaginaSobreNosotros";
import { useState } from "react";
import ListaProductosIndumentarias from "../pages/ListaProductosIndumentarias";
import ListaClases from "../pages/ListaClases";
import ListaUsuarios from "../pages/ListaUsuarios";
import ListaProfes from "../pages/ListaProfes";

const RoutesViews = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);

  return (
    <>
      <NavbarC
        setShowModalLogin={setShowModalLogin}
        showModalLogin={showModalLogin}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<PaginaPrincipal setShowModalLogin={setShowModalLogin} />}
          />
          <Route
            path="/registro"
            element={<Registro setShowModalLogin={setShowModalLogin} />}
          />
          <Route
            path="/suplementos"
            element={<Suplementos setShowModalLogin={setShowModalLogin} />}
          />
          <Route
            path="/indumentarias"
            element={<Indumentaria setShowModalLogin={setShowModalLogin} />}
          />
          <Route
            path="/paginadetalleplanes/:idPlan"
            element={<PaginaDetallePlanes />}
          />
          <Route path="/clases" element={<Clases />} />
          <Route
            path="/detalleproducto/:tipo/:idProducto"
            element={<DetalleProducto setShowModalLogin={setShowModalLogin} />}
          />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/paneladministrador" element={<PanelAdministrador />} />
          <Route
            path="/listaproductossuplementos"
            element={<ListaProductosSuplementos />}
          />
          <Route
            path="/listaproductosindumentarias"
            element={<ListaProductosIndumentarias />}
          />
          <Route path="/listausuarios" element={<ListaUsuarios />} />
          <Route path="/listaclases" element={<ListaClases />} />
          <Route path="/listaprofes" element={<ListaProfes />} />
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
