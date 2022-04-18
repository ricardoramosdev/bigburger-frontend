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


export const Sidebar = () => {
  
  const auth = useAuth();
  const userLogout = ()=>{
    auth.logout()
  }

  return (
    <>
      <div className="themeSwitchContainer">
        <Tooltip title="Light mode" placement="right">
          <Switch />
        </Tooltip>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
          My order
        </Menu.Item>

        
        <Menu.Item key="3" icon={<SettingOutlined />} >
          Order Status
        </Menu.Item>
        <Menu.Item key="4" icon={<UserSwitchOutlined />} >
          Edit Users
        </Menu.Item>
        <Menu.Item key="5" icon={<EditOutlined />}>
          Edit Produtcs
        </Menu.Item>
        
        <Menu.Item key="6" icon={<LogoutOutlined />} onClick={userLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </>
  );
};
