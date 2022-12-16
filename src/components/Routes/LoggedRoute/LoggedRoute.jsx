import { isLoggedIn } from "service/userService";
import { Navigate } from "react-router-dom";

const LoggedRoute = (props) => {
  const isLogged = isLoggedIn();

  return isLogged ? props.children : <Navigate to="/login" />;
};

export default LoggedRoute;
