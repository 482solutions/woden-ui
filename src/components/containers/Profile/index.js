import React, { Component } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Profile extends Component {
  render() {
    return (
      <div>
        <div>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined/>}/>

        </div>
      </div>
    );
  }
}

export default Profile;