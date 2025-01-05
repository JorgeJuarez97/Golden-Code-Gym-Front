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
import { useEffect, useState } from "react";
import ListaProductosIndumentarias from "../pages/ListaProductosIndumentarias";
import ListaClases from "../pages/ListaClases";
import ListaUsuarios from "../pages/ListaUsuarios";
import ListaProfes from "../pages/ListaProfes";
import ListaPlanes from "../pages/ListaPlanes";
import PagoExitoso from "../pages/PagoExitoso";
import Error404 from "../pages/Error404";
import PrivateRoute from "../components/PrivateRoute";

const RoutesViews = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [cantidadTotal, setCantidadTotal] = useState(0);

  useEffect(() => {
    const cantidadGuardada = parseInt(localStorage.getItem("cantidadTotal"));
    if (cantidadGuardada) {
      setCantidadTotal(parseInt(cantidadGuardada, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cantidadTotal", cantidadTotal);
  }, [cantidadTotal]);

  return (
    <>
      <NavbarC
        setShowModalLogin={setShowModalLogin}
        showModalLogin={showModalLogin}
        cantidadTotal={cantidadTotal}
        setCantidadTotal={setCantidadTotal}
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
            element={
              <Suplementos
                setShowModalLogin={setShowModalLogin}
                setCantidadTotal={setCantidadTotal}
              />
            }
          />
          <Route
            path="/indumentarias"
            element={
              <Indumentaria
                setShowModalLogin={setShowModalLogin}
                setCantidadTotal={setCantidadTotal}
              />
            }
          />
          <Route
            path="/paginadetalleplanes/:idPlan"
            element={<PaginaDetallePlanes />}
          />
          <Route
            path="/clases"
            element={<Clases setShowModalLogin={setShowModalLogin} />}
          />
          <Route
            path="/detalleproducto/:tipo/:idProducto"
            element={
              <DetalleProducto
                setShowModalLogin={setShowModalLogin}
                setCantidadTotal={setCantidadTotal}
              />
            }
          />
          <Route
            path="/carrito"
            element={<CarritoPage setCantidadTotal={setCantidadTotal} />}
          />
          <Route
            path="/paneladministrador"
            element={
              <PrivateRoute rolRuta={"admin"}>
                <PanelAdministrador />
              </PrivateRoute>
            }
          />
          <Route
            path="/listaproductossuplementos"
            element={
              <PrivateRoute rolRuta={"admin"}>
                <ListaProductosSuplementos />
              </PrivateRoute>
            }
          />
          <Route
            path="/listaproductosindumentarias"
            element={
              <PrivateRoute rolRuta={"admin"}>
                <ListaProductosIndumentarias />
              </PrivateRoute>
            }
          />
          <Route
            path="/listausuarios"
            element={
              <PrivateRoute rolRuta={"admin"}>
                <ListaUsuarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/listaclases"
            element={
              <PrivateRoute rolRuta={"admin"}>
                <ListaClases />
              </PrivateRoute>
            }
          />
          <Route
            path="/listaprofes"
            element={
              <PrivateRoute rolRuta={"admin"}>
                <ListaProfes />
              </PrivateRoute>
            }
          />
          <Route
            path="/listaplanes"
            element={
              <PrivateRoute rolRuta={"admin"}>
                <ListaPlanes />
              </PrivateRoute>
            }
          />
          <Route path="/paginacontacto" element={<PaginaContacto />} />
          <Route
            path="/paginasobrenosotros"
            element={<PaginaSobreNosotros />}
          />
          <Route
            path="/pagoexitoso"
            element={<PagoExitoso setCantidadTotal={setCantidadTotal} />}
          />
          <Route path="/error404" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default RoutesViews;
