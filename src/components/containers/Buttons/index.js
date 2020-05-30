import React, { Component } from 'react';
import {
  Button, Col, Row, Upload,
} from 'antd';
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
    this.props.getFolderData(this.props.parentHash);
  }

  render() {
    return (
      <Row className="homeButtons">
        <Col span={1}>
          {this.props.parentHash !== 'null'
            ? <div onClick={this.goHome} className="goHome">
              <HomeOutlined/>
            </div> : null
          }
        </Col>
        <Col span={1}>
          {this.props.parentHash !== 'null'
            ? <div onClick={this.goBack} className="goBack">
              <LeftOutlined/>
            </div> : null
          }
        </Col>
        <Col span={2}>
          {this.props.parentHash !== 'null'
            ? <span className="currentFolder">{this.props.folderName}</span>
            : <span className="currentFolder">My Drive</span>
          }
        </Col>
        <Col offset={13} span={3}>
          <Upload name="file" beforeUpload={this.beforeUpload} showUploadList={false}>
            <Button className="upload-button">
              <FileAddTwoTone/>File Upload
            </Button>
          </Upload>
        </Col>
        <Col span={2}>
          <NewFolder onFinish={this.props.newFolder}/>
        </Col>
      </Row>
    );
  }
}

export default Buttons;
