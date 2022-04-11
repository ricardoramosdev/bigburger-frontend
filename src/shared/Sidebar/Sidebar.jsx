import React, { useState } from 'react'
import {
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    LogoutOutlined,
    PieChartOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    UserOutlined,
  } from "@ant-design/icons";

import { Menu, Switch, Tooltip } from 'antd';
import './Sidebar.scss'

export const Sidebar = ({user}) => {
   const [adminPanelVisible, adminRoleCheck]= useState(false);
    const userLogout = ()=>{
        localStorage.setItem('user',"");
    }
  return (
    <>
    <div className='themeSwitchContainer'>
    <Tooltip title="Light mode"placement="right">
    <Switch  />

    </Tooltip>
    </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
              My order
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined  />}  className={user.role=="ADMIN_ROLE"?"":"d-none"}>
              Admin Panel
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={userLogout}>
              Logout
            </Menu.Item>
          </Menu>
    </>
  )
}
