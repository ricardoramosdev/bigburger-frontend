import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  EditOutlined,
  SettingOutlined,
  UserSwitchOutlined,

  ShoppingOutlined,

} from "@ant-design/icons";

import { Badge, Menu, Switch, Tooltip } from "antd";
import { useAuth } from "../../auth/useAuth";
import "./Sidebar.scss";
import { AdminRoute } from "../../routers/AdminRoute";
import { Link, NavLink, Router, useLocation } from "react-router-dom";

import menuItems from "./menuItems";

export const Sidebar = ({productsQty}) => {

  //Mantener seleccion de menu activa tras recargar la pagina
  // const[pathKey, setPathKey]=useState(null)
  // const useCurrentPath =()=>{
  //   const {pathname}= useLocation()
  //   const {id}=menuItems.find(item=>'url'==pathname)
  //   setPathKey(id)
  // }


  const auth = useAuth();
  const userLogout = () => {
    auth.logout();
  };
  const userRole = JSON.parse(localStorage.getItem("currentUser")).role;
  const adminRole = userRole == "ADMINISTRADOR" ? true : false;

  

  return (
    <>
      {/*       

      <div className="themeSwitchContainer">
        <Tooltip title="Light mode" placement="right">
          <Switch />
        </Tooltip>
      </div> */}


      <Menu theme="dark" /*defaultSelectedKeys={pathKey}*/ mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to="/">Inicio</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />} className="cart">
          <NavLink to="/cart">
            <Badge count={productsQty} size="small">
              Carrito
            </Badge>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="7" icon={<ShoppingOutlined />}>
          <NavLink to="/myorder">Ordenes</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />} hidden={!adminRole}>
          <NavLink to="/orders">Estado de Ordenes</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserSwitchOutlined />} hidden={!adminRole}>
          <NavLink to="/users">Editar Usuarios</NavLink>
        </Menu.Item>
        <Menu.Item key="5" icon={<EditOutlined />} hidden={!adminRole}>
          <NavLink to="/products">Editar Productos</NavLink>
        </Menu.Item>

        <Menu.Item
          key="6"
          icon={
            <div className="welcome-container">
              <div className="welcomeText">{auth.user.fullName[0]}</div>
            </div>
          }
          onClick={() => userLogout()}
        >
          Cerrar Sesión
        </Menu.Item>
      </Menu>

    </>
  );
};
