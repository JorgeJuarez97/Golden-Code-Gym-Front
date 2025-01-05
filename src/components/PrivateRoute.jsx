import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, rolRuta }) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const rol = JSON.parse(sessionStorage.getItem("rol")) || "";

  if (!token) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  } else {
    if (rolRuta === rol) {
      return children;
    } else {
      if (rol === "user") {
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        return children;
      }
    }
  }
};

export default PrivateRoute;
