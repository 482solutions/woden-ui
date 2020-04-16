import React from 'react';
import { connect } from "react-redux";
import { Layout } from 'antd';
import './App.css';
import {
  Header as AppHeader,
  Footer as AppFooter,
  Sidebar as AppSidebar,
  Loading,
} from "./components";

const {
  Header,
  Footer,
  Content,
  Sider,
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
              <Sider className="app-sidebar" width={250}>
                <AppSidebar/>
              </Sider>
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
