import React, { Component } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import jwt from 'jsonwebtoken';
import './style.css';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'loading',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { data: userName } = jwt.decode(token);
      if (userName) {
        this.setState({ userName });
      }
    }
  }

  render() {
    const { userName } = this.state;
    return (
      <div className="homeProfile">
        <Avatar style={{ backgroundColor: '#3b7cff' }} icon={<UserOutlined/>} className="profileImage"/>
        <div className="userName">{userName}</div>
      </div>
    );
  }
}

export default Profile;
