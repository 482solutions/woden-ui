import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import { ChangePassword, Logout, Profile } from '..';
import { actions } from '../../../state-management';
import { Search } from '../../presentations';
import logoRow from '../../../assets/images/logoRow.svg';
import './style.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.changePassword = this.changePassword.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  async changePassword(data) {
    await this.props.changePasswordRequest(data);
  }

  async onSearch(value) {
    await this.props.search(value);
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Row className="holder">
        <Col span={3} className={'headerLogo flex-start'}>
          <img src={logoRow} alt="Woden logo"/>
        </Col>
        {
          isLoggedIn && (
            <>
              <Col span={10} className='search-block'>
                <Search onSearch={this.onSearch}/>
              </Col>
              <Col span={1} offset={3} className="flex-end">
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

export default connect(({ auth, filesystem }) => ({
  isLoggedIn: auth.isLoggedIn,
  entryFolders: filesystem.entryFolders,
}),
{
  changePasswordRequest: actions.changePasswordRequest,
  search: actions.search,
})(
  Header,
);
