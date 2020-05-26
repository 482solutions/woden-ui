import React, { Component } from 'react';
import { Button, Col, Upload } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import { NewFolder } from '..';
import './style.css';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  beforeUpload(file) {
    this.props.uploadFile(file);
    return false;
  }

  render() {
    return (
      <div className="homeButtons">
        <Col offset={17}>
          <Upload name="file" beforeUpload={this.beforeUpload} showUploadList={false}>
            <Button className="upload-button">
              <FileAddTwoTone/>File Upload
            </Button>
          </Upload>
        </Col>
        <Col>
          <NewFolder onFinish={this.props.newFolder}/>
        </Col>
      </div>
    );
  }
}

export default Buttons;
