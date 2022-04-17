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
import "./Sidebar.scss";


export const Sidebar = ({ user }) => {
  
  const userLogout = () => {
    localStorage.setItem("user", "");
  };

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

        
        <Menu.Item key="3" icon={<SettingOutlined />} className={user.role=="ADMIN_ROLE"? "":"d-none"}>
          Order Status
        </Menu.Item>
        <Menu.Item key="4" icon={<UserSwitchOutlined />} className={user.role=="ADMIN_ROLE"? "":"d-none"}>
          Edit Users
        </Menu.Item>
        <Menu.Item key="5" icon={<EditOutlined />}className={user.role=="ADMIN_ROLE"? "":"d-none"}>
          Edit Produtcs
        </Menu.Item>
        
        <Menu.Item key="6" icon={<LogoutOutlined />} onClick={userLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </>
  );
};
