import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import cn from "classnames";
import "./style.css";
import { ChangePassword, Logout, NewFolder, FileUpload, Profile } from '../../containers';
import { Logo } from '../../presentations';

import { actions } from '../../../state-management';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  changePassword = async (data) => {
    await this.props.changePasswordRequest(data);
  };
  createDirectory = async (data) => {
    await this.props.createDirectory(data);
  };

  render() {
    const { isLoggedIn } = this.props;
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
              {/*<Col span={3} offset={4} className="flex-end">*/}
              {/*  <FileUpload/>*/}
              {/*</Col>*/}
              {/*<Col span={3} className="flex-end">*/}
              {/*  <NewFolder onFinish={this.createDirectory}/>*/}
              {/*</Col>*/}
              <Col span={1} offset={14} className="flex-end">
                <ChangePassword onFinish={this.changePassword}/>
              </Col>
              {/*<Col span={3} className="flex-end">*/}
              {/*  <Logout/>*/}
              {/*</Col>*/}
              <Col span={1} offset={1}>
                <Profile/>
              </Col>
              <Col span={2}>
                <div className="user__name">Ivan</div>
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
