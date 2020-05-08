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
    this.onChange = this.onChange.bind(this);
  }

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      console.log(info);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    return (
      <Upload name="file" onChange={this.onChange} showUploadList={false}>
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