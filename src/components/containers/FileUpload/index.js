import React, { Component } from 'react';
import { Upload, message, Button } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import Col from 'antd/es/grid/col';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
    };
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  beforeUpload(file) {
    // eslint-disable-next-line no-console
    console.log(file);
    return false;
  };

  render() {
    return (
      <Upload name="file" beforeUpload={this.beforeUpload} showUploadList={false}>
        <Col span={3}>
          <Button className="upload-button">
					<span role="img">
					</span>
            <FileAddTwoTone/> File Upload
          </Button>
        </Col>
      </Upload>
    );
  }

}

export default FileUpload;