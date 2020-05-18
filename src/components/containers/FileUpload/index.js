import React, { Component } from 'react';
import { Upload, Button } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  beforeUpload(file) {
    // eslint-disable-next-line no-console
    console.log(file);
    return false;
  }

  render() {
    return (
      <Upload name="file" beforeUpload={this.beforeUpload} showUploadList={false}>
        <Button className="upload-button">
					<span role="img">
					</span>
          <FileAddTwoTone/>File Upload
        </Button>
      </Upload>
    );
  }
}

export default FileUpload;