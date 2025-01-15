import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, NavLink } from "react-router-dom";
import "./navBar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <NavLink to="/">Home</NavLink>,
    key: "/",
  },
  {
    label: <NavLink to="/Favorite">Favorite</NavLink>,
    key: "/Favorite",
  },
  {
    label: <NavLink to="/Add">Add</NavLink>,
    key: "/Add",
  },
];

const NavBar: React.FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get the theme state
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  
  return (
      <Menu
        onClick={onClick}
        theme={isDarkMode ? "dark" : "light"}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="custom-menu"
      />
  );
};

export default NavBar;
