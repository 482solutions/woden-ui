import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import cn from "classnames";
import "./style.css";
import { Logout } from '../../containers';

const Header = ({ isLoggedIn }) => (
  <Row className="holder">
    <Col span={4} className={cn("header__logo", {
      "flex-start": isLoggedIn,
      "flex-center": !isLoggedIn
    })}>
      Woden
    </Col>
    {
      isLoggedIn && (
        <>
          <Col span={6} offset={14} className="flex-end">
            <Logout/>
          </Col>
        </>
      )
    }
  </Row>
);

export default withRouter(connect(
  ({ auth }) => ({ isLoggedIn: auth.isLoggedIn })
)(Header));
