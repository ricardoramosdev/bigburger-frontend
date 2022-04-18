import { Layout } from "antd";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { Sidebar } from "../../shared/Sidebar/Sidebar";
import { Products } from "../Products/Products";
import { UserList } from "../Users/UserList/UserList";
import "./Home.scss";

const {  Content, Sider } = Layout;
export const Home = ({ user, ...props }) => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header user={user} />
        <Layout className="fullHeight">
          <Sider className="fullHeight">
            <Sidebar user={user} />
          </Sider>
          <Layout>

          <Content className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
            <Products/>
            <UserList/>
            {/* <Routes>
               <Route path="/products" element={}/>
               <Route path="/users" element={}/>

            
            </Routes> */}
          
          </Content>

          </Layout>
        </Layout>
        <Footer/>
      </Layout>
    </>
  );
};
