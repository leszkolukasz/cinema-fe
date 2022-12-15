import { Menu } from "antd";
import { useState } from "react";

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
      key: 'myReservations',
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
    const onClick = (e) => {
      setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Navbar;
