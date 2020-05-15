import React, { Component } from 'react';
import { NewFolder, FileUpload } from '..';
import './style.css';
import { Button, Col, Upload } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';

class Buttons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home__buttons">
        <Col offset={17}>
          {/*<FileUpload beforeUpload={this.props.uploadFile}/>*/}
          <Upload name="file" beforeUpload={this.props.uploadFile} showUploadList={false}>
            <Button className="upload-button">
					<span role="img">
					</span>
              <FileAddTwoTone/> File Upload
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
