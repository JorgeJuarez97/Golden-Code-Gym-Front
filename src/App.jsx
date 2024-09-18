import "./App.css";
import NavbarC from "./components/NavbarC";
import CarouselC from "./components/CarouselC";
import Planes from "./components/Planes";
import Infogym from "./components/Infogym";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <NavbarC />
      <main>
        <CarouselC />
        <Infogym />
        <Planes />
      </main>
      <Footer />
    </>
  );
};

export default App;
