import React, { useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  EditOutlined,
  SettingOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

import { Menu, Switch, Tooltip } from "antd";
import { useAuth } from "../../auth/useAuth";
import "./Sidebar.scss";
import { AdminRoute } from "../../routers/AdminRoute";
import { Link, Router } from "react-router-dom";


export const Sidebar = () => {
  
  const auth = useAuth();
  const userLogout = ()=>{
    auth.logout()
  }
  const userRole = JSON.parse(localStorage.getItem('currentUser')).role
  const adminRole = userRole == 'ADMIN_ROLE'? true : false;

  return (
    <>
      <div className="themeSwitchContainer">
        <Tooltip title="Light mode" placement="right">
          <Switch />
        </Tooltip>
      </div>
      
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to ="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />} className="cart">
          <Link to ="/cart">Cart
          <span className="noti-bubble"></span>
          </Link>
        </Menu.Item>

        <Menu.Item key="3" icon={<SettingOutlined />} hidden={!adminRole} >
          <Link to ="/orders">Orders Status</Link>
          
        </Menu.Item>
        <Menu.Item key="4" icon={<UserSwitchOutlined />}  hidden={!adminRole} >
          <Link to ="/users">Edit Users</Link>
          
        </Menu.Item>
        <Menu.Item key="5" icon={<EditOutlined />}  hidden={!adminRole}>
          <Link to ="/products">Edit Products</Link>
          
        </Menu.Item>
         
        <Menu.Item key="6" icon={<LogoutOutlined />} onClick={userLogout}>
          Logout
        </Menu.Item>
      </Menu>
      
    </>
  );
};
