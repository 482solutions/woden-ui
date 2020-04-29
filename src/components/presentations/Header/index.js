import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import cn from "classnames";
import "./style.css";
import { ChangePassword, Logout } from '../../containers';

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
          <Col span={1} offset={13} className="flex-end">
            <ChangePassword/>
          </Col>
          <Col span={6} className="flex-end">
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
