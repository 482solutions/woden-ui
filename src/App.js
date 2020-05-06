import React from 'react';
import { connect } from "react-redux";
import { Layout } from 'antd';
import './App.css';
import { Footer as AppFooter, Header as AppHeader, Loading, } from "./components";

const {
  Header,
  Footer,
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

        {
          auth.isLoggedIn &&
          <Footer className="app-footer">
            <AppFooter/>
          </Footer>
        }
      </Layout>

      {loading && <Loading isFullScreen={true} text="Sending transaction..."/>}
    </>
  ));
