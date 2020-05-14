import React, { Component } from 'react';
import { Col } from 'antd';
import { NewFolder, FileUpload } from '../../containers';
import './style.css';

class Buttons extends Component {
  render() {
    return (
      <div className="home__buttons">
        <Col offset={17}>
          <FileUpload/>
        </Col>
        <Col>
          <NewFolder onFinish={this.createDirectory}/>
        </Col>
      </div>
    );
  }
}

export default Buttons;
