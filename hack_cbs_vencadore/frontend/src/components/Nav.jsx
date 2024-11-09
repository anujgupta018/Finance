import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Typography } from 'antd';
import '../style/Nav.css';

const { Title } = Typography;

const navItems = [
  { name: 'Dashboard', href: '/Dashboard' },
  { name: 'Goals', href: '/Goal-Manager' },
  { name: 'Transactions', href: '/transaction' },
  { name: 'Settings', href: '/Setting' },
];

export default function Navbar() {
  const location = useLocation();
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <Title level={4} className="navbar-title">Auto Round-Up</Title>
        </Link>
        <div className="navbar-links">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`navbar-link ${location.pathname === item.href ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <Button className="navbar-toggle" onClick={showDrawer} icon={<MenuOutlined />} />
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        closable={false}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`drawer-link ${location.pathname === item.href ? 'active' : ''}`}
            onClick={closeDrawer}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </Drawer>
    </nav>
  );
}
