import "./App.css";
import NavbarC from "./components/NavbarC";
import CarouselC from "./components/CarouselC";
import Planes from "./components/Planes";

const App = () => {
  return (
    <>
      <NavbarC />
      <main>
        <CarouselC />
        <Planes />
      </main>
    </>
  );
};

export default App;
