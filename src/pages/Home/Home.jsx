

import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";

import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Header } from "../../shared/Header/Header";
import { Sidebar } from "../../shared/Sidebar/Sidebar";
import { ProductList } from "../Products/ProductsList/ProductList";
import "./Home.scss";

export const Home = () => {
 
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Sider >
          {/* <Sidebar /> */}
        </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
          
          <Content className="site-layout-background" style={{padding: 24,margin: 0,minHeight: 280}}>

            <ProductList/>

          </Content>
        </Layout>
      </Layout>
    </>
  );
};
