import React, { Component } from 'react';
import { NewFolder, FileUpload } from '../../containers';
import './style.css';
import { Col } from 'antd';

class Buttons extends Component {
  render() {
    return (
      <div className="buttons">
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
