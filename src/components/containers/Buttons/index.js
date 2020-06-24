import React, { Component } from 'react';
import {
  Button, Col, Row, Upload,
} from 'antd';
import { getRootFolderHash } from '../../../utils/functions';
import './style.css';
import { NewFolder } from '..';
import goHome from '../../../assets/images/goHome.svg';
import goBack from '../../../assets/images/goBack.svg';
import fileUploadIcon from '../../../assets/images/fileUploadIcon.svg';

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
          {this.props.folderData.parentHash !== 'root'
            ? <div onClick={this.goHome} className="goHome">
                <img src={goHome} alt="goHome"/>
              </div>
            : <div className="goHome_inactive goHome">
                <img src={goHome} alt="goHome"/>
              </div>
          }
        </Col>
         <Col span={1}>
          {this.props.folderData.parentHash !== 'root'
            ? <div onClick={this.goBack} className="goBack">
                <img src={goBack} alt="goBack"/>
              </div>
            : <div className="goBack_inactive goBack">
                <img src={goBack} alt="goBack"/>
              </div>
          }
         </Col>
        <Col span={2}>
          {
            this.props.folderData.parentHash !== 'root'
            ? <span className="currentFolder">{this.props.folderData.folderName}</span>
            : <span className="currentFolder">{this.props.mode ==='drive' ? 'My Drive': this.props.mode === 'share'? 'Shared with me' : null}</span>
          }
        </Col>
        {
          this.props.mode === 'drive' ?
          <Col span={2} offset={14}>
            <NewFolder onFinish={this.props.newFolder}/>
          </Col> :
            <Col span={2} offset={14}>
              <NewFolder onFinish={this.props.newFolder}/>
            </Col>
        }
        {
          this.props.mode === 'drive' ? <Col offset={1} span={3}>
            <Upload name="file" beforeUpload={this.beforeUpload} showUploadList={false}>
              <Button className="upload-button">
                <img src={fileUploadIcon} alt="" className="buttonIcon fileUploadIcon"/>Upload File
              </Button>
            </Upload>
          </Col> : <Col offset={1} span={3}>
            <Upload name="file" beforeUpload={this.beforeUpload} showUploadList={false}>
              <Button className="upload-button">
                <img src={fileUploadIcon} alt="" className="buttonIcon fileUploadIcon"/>Upload File
              </Button>
            </Upload>
          </Col>
        }
      </Row>
    );
  }
}

export default Buttons;
