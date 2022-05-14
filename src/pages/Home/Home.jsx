import { Layout } from "antd";


import React, { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import { AdminRoute } from "../../routers/AdminRoute";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { Sidebar } from "../../shared/Sidebar/Sidebar";
import { Cart } from "../Orders/Cart";
import { OrderList } from "../Orders/OrderList/OrderList";
import { Products } from "../Products/Products";
import { ProductHome } from "../Products/ProductsList/ProductHome";
import { User } from "../Users/User";

import { MyOrders } from "../Orders/OrderList/MyOrders";
import "./Home.scss";

const { Content, Sider } = Layout;
export const Home = () => {
  const initialCart = JSON.parse(localStorage.getItem('inCart'))
  const [productsQty, setProductQty] = useState(0);
  const bCount = (cart) => {
   
    const burgerCount = cart?.reduce(
      (counter, itemQty) => counter + itemQty.cantidad,
      0
    );
    setProductQty(burgerCount);
  };
  useEffect(()=>{
    bCount(initialCart)},[]
  )
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header productsQty={productsQty}/>
        <Layout className="fullHeight">
          <Sider  breakpoint="lg" collapsedWidth="60px"   style={{
       
      }}>
            <Sidebar productsQty={productsQty} />
          </Sider>
          
            <Content
              className="site-layout-background" 
              breakpoint="lg" 
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                width:'100%'
              }}
            >
              <Routes>
                <Route path="/" element={<ProductHome bCount={(b)=>bCount(b)} />} />
                <Route path="/cart" element={<Cart bCount={(b)=>bCount(b)} />} />
                <Route path="/myorder" element={<MyOrders />} />
                <Route
                  path="/products"
                  element={
                    <AdminRoute>
                      <Products />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/orders"
                  element={
                    <AdminRoute>
                      <OrderList />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <AdminRoute>
                      <User />
                    </AdminRoute>
                  }
                />
              </Routes>
            </Content>
          
        </Layout>
        <Footer />

      </Layout>
    </>
  );
};
