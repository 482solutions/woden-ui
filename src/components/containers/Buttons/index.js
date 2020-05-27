import React, { Component } from 'react';
import { Button, Col, Upload } from 'antd';
import { FileAddTwoTone, HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { NewFolder } from '..';
import './style.css';
import { getRootFolderHash } from '../../../utils/functions';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  beforeUpload(file) {
    this.props.uploadFile(file);
    return false;
  }

  async goHome() {
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash);
  }

  goBack() {

  }

  render() {
    return (
      <div className="homeButtons">
        <Col>
          <HomeOutlined onClick={this.goHome}/>
        </Col>
        <Col>
          <LeftOutlined/>
        </Col>
        <Col>
          <span>{this.props.folderName}</span>
        </Col>
        <Col offset={16}>
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
