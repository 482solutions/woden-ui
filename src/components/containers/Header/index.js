import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import cn from 'classnames';
import './style.css';
import { ChangePassword, Profile, Logout } from '..';
import logoRow from '../../../assets/images/logoRow.svg';
import { actions } from '../../../state-management';

class Header extends Component {
  constructor(props) {
    super(props);
    this.changePassword = this.changePassword.bind(this);
  }
  async changePassword(data) {
    console.log(this.props);
    await this.props.changePasswordRequest(data);
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Row className="holder">
        <Col span={3} className={cn('header__logo', {
          'flex-start': isLoggedIn,
          'flex-center': !isLoggedIn,
        })}>
          <img src={logoRow} alt="Woden logo"/>
        </Col>
        {
          isLoggedIn && (
            <>
              <Col span={1} offset={13} className="flex-end">
                <ChangePassword onFinish={this.changePassword}/>
              </Col>
              <Col span={4} className="flex-end">
                <Logout/>
              </Col>
              <Col span={3}>
                <Profile/>
              </Col>
            </>
          )
        }
      </Row>
    );
  }
}

export default connect(({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
}),
{ changePasswordRequest: actions.changePasswordRequest, createDirectory: actions.createFolderRequest })(
  Header,
);
