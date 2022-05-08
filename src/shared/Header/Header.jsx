
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Menu, Switch } from "antd";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo-transparente.png";
import "./Header.scss";
export const Header = ({productsQty}) => {
   return (
    <>
      <div className="navbar">
        <div>
          <img src={logo} className="logo"></img>
        </div>
        <NavLink className="nav-cart" to="/cart">
          <Badge count={productsQty} className='badge'size="small">
            <ShoppingCartOutlined />
          </Badge>
        </NavLink>
      </div>

    </>
  );
};
