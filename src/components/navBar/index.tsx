import React , { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './navBar.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to="/">Home</Link>,
    key: '/',
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/Favorite">Favorite</Link>,
    key: '/Favorite',
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link to="/Detail">Detail</Link>,
    key: '/Detail',
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link to="/Add">Add</Link>,
    key: '/Add',
    icon: <AppstoreOutlined />,
  }
];

const NavBar: React.FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="custom-menu"/>;
};

export default NavBar;