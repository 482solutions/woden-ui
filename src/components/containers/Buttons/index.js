import React, { Component } from 'react';
import { Button, Col, Upload } from 'antd';
import { FileAddTwoTone, HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { NewFolder } from '..';
import { getRootFolderHash } from '../../../utils/functions';
import './style.css';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  beforeUpload(file) {
    this.props.uploadFile(file);
    return false;
  }

  async goHome() {
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash);
  }

  async goBack() {
    const hash = await getRootFolderHash();
    this.props.parentHash(hash);
  }

  render() {
    return (
      <div className="homeButtons">
        <Col>
          <div onClick={this.goHome} className="goHome">
            <HomeOutlined/>
          </div>
        </Col>
        <Col>
          <LeftOutlined onClick={this.goBack} className="goBack"/>
        </Col>
        <Col>
          <span className="currentFolder">{this.props.folderName}</span>
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
