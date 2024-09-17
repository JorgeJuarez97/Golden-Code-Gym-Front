import "./App.css";
import NavbarC from "./components/NavbarC";
import CarouselC from "./components/CarouselC";
import Planes from "./components/Planes";
import Infogym from "./components/Infogym";

const App = () => {
  return (
    <>
      <NavbarC />
      <main>
        <CarouselC />
        <Infogym />
        <Planes />
      </main>
    </>
  );
};

export default App;
