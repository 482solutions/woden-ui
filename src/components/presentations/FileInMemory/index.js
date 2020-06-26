import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './style.css';

export default ({
  accept, beforeUpload, title, description,
}) => (
  <div id="LoginFileDrop">
    <Upload.Dragger
      className="dragger"
      name="file"
      multiple={true}
      accept={accept}
      beforeUpload={beforeUpload}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined/>
      </p>
      <p className="ant-upload-text">{title}</p>
      <p className="ant-upload-hint">{description}</p>
    </Upload.Dragger>
  </div>
);
