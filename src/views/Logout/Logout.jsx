import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { deleteToken } from "service/userService";

const Logout = () => {
  useEffect(() => {
    deleteToken();
  });

  return <Navigate to="/" replace={true} />;
};

export default Logout;
