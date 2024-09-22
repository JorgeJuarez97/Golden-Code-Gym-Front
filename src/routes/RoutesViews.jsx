import { Route, Routes } from "react-router-dom";
import NavbarC from "../components/NavbarC";
import Footer from "../components/Footer";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import Registro from "../pages/Registro";

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <main>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default RoutesViews;
