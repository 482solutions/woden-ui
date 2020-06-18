import React, { Component } from 'react';
import {
  Button, Col, Row, Upload,
} from 'antd';
import { FileAddTwoTone, HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { getRootFolderHash } from '../../../utils/functions';
import './style.css';
import { NewFolder } from '..';

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
    this.props.getFolderData(this.props.folderData.parentHash);
  }

  render() {
    return (
      <Row className='homeButtons'>
        <Col span={1}>
          {this.props.mode !== 'drive' || this.props.folderData.parentHash !== 'root'
            ? <div onClick={this.goHome} className="goHome">
              <HomeOutlined/>
            </div> : null
          }
        </Col>
         <Col span={1}>
          {this.props.folderData.parentHash !== 'root'
            ? <div onClick={this.goBack} className="goBack">
              <LeftOutlined/>
            </div> : null
          }
         </Col>
        <Col span={2}>
          {this.props.mode === 'drive' && this.props.folderData.parentHash !== 'root'
            ? <span className="currentFolder">{this.props.folderData.folderName}</span>
            : <span className="currentFolder">My Drive</span>
          }
        </Col>
        {
          this.props.mode === 'drive' && <Col offset={14} span={3}>
            <Upload name="file" beforeUpload={this.beforeUpload} showUploadList={false}>
              <Button className="upload-button">
                <FileAddTwoTone/>File Upload
              </Button>
            </Upload>
          </Col>}
        {
          this.props.mode === 'drive' && <Col span={2}>
          <NewFolder onFinish={this.props.newFolder}/>
          </Col>
        }
      </Row>
    );
  }
}

export default Buttons;
