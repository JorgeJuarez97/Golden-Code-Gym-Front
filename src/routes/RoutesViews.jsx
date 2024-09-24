import { Route, Routes } from "react-router-dom";
import NavbarC from "../components/NavbarC";
import Footer from "../components/Footer";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import Registro from "../pages/Registro";
import Suplementos from "../pages/Suplementos";
import Indumentaria from "../pages/Indumentaria";
import DetallePlanes from "../components/DetallePlanes";

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
          <Route path="/detalleplanes/:planId" element={<DetallePlanes />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default RoutesViews;
