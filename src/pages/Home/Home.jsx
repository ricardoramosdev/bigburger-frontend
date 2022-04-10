

import { Layout } from "antd";

import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Header } from "../../shared/Header/Header";
import { Sidebar } from "../../shared/Sidebar/Sidebar";
import "./Home.scss";

export const Home = () => {
 
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Sider >
          {/* <Sidebar /> */}
        </Sider>
      </Layout>
    </>
  );
};
