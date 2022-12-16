import { Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { isLoggedIn } from "service/userService";

const guestItems = [
  {
    label: "Movies",
    key: "movies",
  },
  {
    label: "Login",
    key: "login",
  },
  {
    label: "Sign up",
    key: "sign-up",
  },
];

const LoggedInItems = [
  {
    label: "Movies",
    key: "movies",
  },
  {
    label: "Reserve",
    key: "reserve",
  },
  {
    label: "My reservations",
    key: "my-reservations",
  },
  {
    label: "Logout",
    key: "logout",
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState("movies");
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  let items = isLoggedIn() ? LoggedInItems : guestItems;

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
