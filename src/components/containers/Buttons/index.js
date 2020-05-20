import React, { Component } from 'react';
import { Button, Col, Upload } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import { NewFolder } from '..';
import './style.css';

class Buttons extends Component {
  render() {
    return (
      <div className="home__buttons">
        <Col offset={17}>
          <Upload className="fileUpload" name="file" beforeUpload={this.props.uploadFile} showUploadList={false}>
            <Button className="upload-button">
					<span role="img">
					</span>
              <FileAddTwoTone/> File Upload
            </Button>
          </Upload>
        </Col>
        <Col>
          <NewFolder className="newFolder" onFinish={this.props.newFolder}/>
        </Col>
      </div>
    );
  }
}

export default Buttons;
