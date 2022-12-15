import { Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
    {
      label: 'Movies',
      key: 'movies',
    },
    {
      label: 'Reserve',
      key: 'reserve',
    },
    {
      label: 'My reservations',
      key: 'my-reservations',
    },
    {
      label: 'Admin',
      key: 'admin',
    }
    ,
    {
      label: 'Login',
      key: 'login',
    }
];

const Navbar = () => {
    const [current, setCurrent] = useState('movies');
    const navigate = useNavigate();

    const onClick = (e) => {
      setCurrent(e.key);
      navigate(`/${e.key}`);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Navbar;
