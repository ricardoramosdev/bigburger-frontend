import { Layout } from "antd";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminRoute } from "../../routers/AdminRoute";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { Sidebar } from "../../shared/Sidebar/Sidebar";
import { Cart } from "../Orders/Cart";
import { OrderList } from "../Orders/OrderList/OrderList";
import { Products } from "../Products/Products";
import { ProductHome } from "../Products/ProductsList/ProductHome";
import { User } from "../Users/user";
import {MyOrders} from "../Orders/OrderList/MyOrders"
import "./Home.scss";

const {  Content, Sider } = Layout;
export const Home = ({ user, ...props }) => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header user={user} />
        <Layout className="fullHeight">
          <Sider className="fullHeight"   breakpoint="lg"
      collapsedWidth="60px">
            <Sidebar user={user} />
          </Sider>
          <Layout>

          <Content className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
            <Routes>
               <Route path="/" element={<ProductHome />}/>
               <Route path="/cart" element={<Cart />}/>
               <Route path="/myorder" element={<MyOrders />}/>
               <Route path="/products" element={<AdminRoute><Products /></AdminRoute> }/>
           
               <Route path="/orders" element={<AdminRoute><OrderList /></AdminRoute> }/>
               <Route path="/users" element={<AdminRoute><User/></AdminRoute>}/>

            
            </Routes>
          
          </Content>

          </Layout>
        </Layout>
        <Footer/>
      </Layout>
    </>
  );
};
