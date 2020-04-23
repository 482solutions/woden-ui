import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import cn from "classnames";
import "./style.css";
import {Logout, Search} from '../../containers';

const Header = ({ location, logout, isLoggedIn }) => (
  <Row className="holder">
    <Col span={4} className={cn("header__logo", {
      "flex-start": isLoggedIn,
      "flex-center": !isLoggedIn
    })}>
      Docmans UI
    </Col>
    {
      isLoggedIn && (
        <>
          <Col span={14} className="flex-center">
            <Search />
          </Col>
          <Col span={6} className="flex-end">
            <Logout />
          </Col>
        </>
      )
    }
  </Row>
);

export default withRouter(connect(
  ({ auth }) => ({ isLoggedIn: auth.isLoggedIn })
)(Header));