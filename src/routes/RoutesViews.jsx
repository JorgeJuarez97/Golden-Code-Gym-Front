import { Route, Routes } from "react-router-dom";
import NavbarC from "../components/NavbarC";
import Footer from "../components/Footer";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import Registro from "../pages/Registro";
import Suplementos from "../pages/Suplementos";
import Indumentaria from "../pages/Indumentaria";
import PaginaDetallePlanes from "../pages/PaginaDetallePlanes";
import Clases from "../pages/Clases";

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <main>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/suplementos" element={<Suplementos />} />
          <Route path="/indumentaria" element={<Indumentaria />} />
          <Route
            path="/paginadetalleplanes/:planId"
            element={<PaginaDetallePlanes />}
          />
          <Route path="/clases" element={<Clases />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default RoutesViews;
