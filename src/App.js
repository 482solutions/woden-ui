import React from 'react';
import { connect } from "react-redux";
import { Layout } from 'antd';
import './App.css';
import { Header as AppHeader, Loading, } from "./components";

const {
  Header,
  Content,
} = Layout;

export default connect(({ loading, auth }) => ({ loading, auth }))(
  ({ children, loading, auth }) => (
    <>
      <Layout>

        {
          auth.isLoggedIn &&
          <Header className="app-header">
            <AppHeader/>
          </Header>
        }
        {
          !auth.isLoggedIn ? (
            <Content className="app-content">{children}</Content>
          ) : (
            <Layout>
              <Content className="app-content">{children}</Content>
            </Layout>
          )
        }
      </Layout>

      {loading && <Loading isFullScreen={true} text="Sending transaction..."/>}
    </>
  ));
