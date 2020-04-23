import React from 'react';
import { connect } from 'react-redux';
import { message, Typography, Upload } from 'antd';
import { Data } from '../../presentations';
import { actions } from '../../../state-management';
import { api, functions } from '../../../utils';

import './style.css';

const { Title } = Typography;

class Files extends React.Component {
  static types = {
    'pdf': 'file-pdf',
    'doc': 'file-word',
    'docx': 'file-word',
    'txt': 'file-text',
    'md': 'file-markdown',
    'ppt': 'file-ppt',
    'pptx': 'file-ppt',
    'xls': 'file-excel',
    'xlsx': 'file-excel',
  };

  beforeUpload = (file) => {
    this.props.uploadFile(file);
    return false;
  };

  getFiles = () => {
    const { directory, entries } = this.props.filesystem;

    const currentDir = functions.getCurrentDirectory(directory, entries);

    return currentDir.filter((curr) => typeof curr === 'string').map(filename => {
      this.props.loadPermissions(`${directory}/${filename}`);
      return {
        filename,
        parent: directory,
      };
    });
  };

  isInSharedFolder = () => {
    const { directory } = this.props.filesystem;
    return directory.split('/')[1] === 'shared';
  };

  isSharedDir = () => {
    const { directory } = this.props.filesystem;
    const couldBeShared = directory.split('/').slice(-2);
    return couldBeShared[0] === 'shared' || couldBeShared[1] === 'shared'
  };

  hasEditPermission = () => {
    const { filesystem: { directory }, permissions, auth } = this.props;

    if (this.isInSharedFolder() && !this.isSharedDir()) {
      return permissions.info[directory] && !permissions.info[directory].view.includes(auth.user.name) && (
        permissions.info[directory].edit.includes(auth.user.name)
      );
    }

    return !this.isSharedDir();
  };

  downloadFile = async (filename) => {
    const { filesystem: { directory } } = this.props;

    if (this.hasEditPermission()) {
      message.error('You do not have permissions for download this file');
      return;
    }

    const pathList = directory.split('/').slice(1);
    pathList.push(filename);

    let response;
    if (pathList[0] === 'shared') {
      response = await api.downloadSharedFile(pathList.slice(1).join('/'));
    } else {
      response = await api.downloadFile(pathList.join('/'));
    }
    if (response.data.error) {
      // message.error(response.data.error);
      return;
    }
    console.log(response);

    functions.createLink({
      filename: response.headers['content-disposition'].split('attachment; filename=')[1],
      type: response.headers['content-type'],
      content: response.data
    });
  };

  setSelected = (file) => {
    this.props.showPermissions(`${file.parent}/${file.filename}`);
    this.props.setSelected({ type: "file", name: file.filename });
  };

  render() {
    let { selected } = this.props.filesystem;
    return (
      <>
        <Title level={4}>Files</Title>
        <div className="flex-start ff-rw">
          {
            this.hasEditPermission() && (
              <Upload
                beforeUpload={this.beforeUpload}
                multiple={true}
                fileList={undefined}
                accept=".doc,.docx,.pdf,.txt,.md,.ppt,.pptx,.xls,.xlsx"
              >
                <Data
                  type="file-add"
                  name="Upload file"
                />
              </Upload>
            )
          }
          {
            this.getFiles().map((i) => (
              <Data
                key={i.filename}
                type={Files.types[i.filename.split('.').pop()] || 'file-unknown'}
                name={i.filename}
                onClick={() => this.setSelected(i)}
                onDoubleClick={() => this.downloadFile(i.filename)}
                selected={selected.type === "file" && selected.name === i.filename}
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default connect(({ filesystem, permissions, auth }) => ({ filesystem, permissions, auth }), {
  uploadFile: actions.uploadFile,
  showPermissions: actions.showPermissions,
  loadPermissions: actions.loadPermissions,
  setSelected: actions.setSelected,
  setUnselected: actions.setUnselected
})(Files);