import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import cn from "classnames";
import jwt from 'jsonwebtoken';
import "./style.css";
import { ChangePassword, Profile } from '../../containers';
import { Logo } from '../../presentations';

import { actions } from '../../../state-management';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'loading'
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { data: userName } = jwt.decode(token);
      if (userName) {
        this.setState({ userName: userName });
      }
    }
  }

  changePassword = async (data) => {
    await this.props.changePasswordRequest(data);
  };
  createDirectory = async (data) => {
    await this.props.createDirectory(data);
  };

  render() {
    const { isLoggedIn } = this.props;
    const { userName } = this.state;
    return (
      <Row className="holder">
        <Col span={3} className={cn("header__logo", {
          "flex-start": isLoggedIn,
          "flex-center": !isLoggedIn
        })}>
          <Logo/>
        </Col>
        {
          isLoggedIn && (
            <>
              <Col span={1} offset={15} className="flex-end">
                <ChangePassword onFinish={this.changePassword}/>
              </Col>
              {/*<Col span={3} className="flex-end">*/}
              {/*  <Logout/>*/}
              {/*</Col>*/}
              <Col span={1} offset={1}>
                <Profile/>
              </Col>
              <Col span={3}>
                <div className="user__name">{userName}</div>
              </Col>
            </>
          )
        }
      </Row>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { changePasswordRequest: actions.changePasswordRequest, createDirectory: actions.createDirectory }
)(Header);
