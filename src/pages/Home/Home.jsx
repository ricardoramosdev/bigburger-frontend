import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";

import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { Sidebar } from "../../shared/Sidebar/Sidebar";
import "./Home.scss";

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

          {/* <Content>Aqui van las listas de productos</Content> */}

          </Layout>
        </Layout>
        <Footer/>
      </Layout>
    </>
  );
};
