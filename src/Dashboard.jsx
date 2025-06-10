import React, { useState } from 'react'
import { Layout, Menu} from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {HomeOutlined,HistoryOutlined,LogoutOutlined} from '@ant-design/icons'
import { HeaderBar } from './Page/HeaderBar';



const { Header, Sider, Content } = Layout;

export const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(val) => setCollapsed(val)}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split('/')[2]]}
          onClick={({ key }) => {
            if (key === 'logout') logout();
            else navigate(`/dashboard/${key}`);
          }}
        >
          <Menu.Item key="home"icon={<HomeOutlined />} >Home</Menu.Item>
          <Menu.Item key="leavedetails" icon={<HistoryOutlined />} >Leave History</Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <HeaderBar /> 
        <Content  style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
