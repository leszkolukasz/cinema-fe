import { isLoggedIn } from "service/userService";
import { Navigate } from "react-router-dom";

const GuestRoute = (props) => {
  const isLogged = isLoggedIn();

  return !isLogged ? props.children : <Navigate to="/" />;
};

export default GuestRoute;
