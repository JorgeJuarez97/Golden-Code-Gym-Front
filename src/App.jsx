import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import ScrollArriba from "./components/ScrollArriba";

const App = () => {
  return (
    <>
      <Router>
        <ScrollArriba />
        <RoutesViews />
      </Router>
    </>
  );
};

export default App;
