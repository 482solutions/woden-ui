import React, { Component } from 'react';
import './style.css';
import { Dropdown, Menu, Upload } from 'antd';
import FolderImage from '../../../assets/images/folder.svg';
import More from '../../../assets/images/more-vertical.svg';
import FileImage from '../../../assets/images/file.svg';

export default class Drive extends Component {
  constructor(props) {
    super(props);
  }

  fileMenu(hash, name, permission) {
    return (
      <Menu>
        <Menu.Item key={`0${hash}`}>
          <span id={`Versions_${hash}`} onClick={async() => {
            await this.props.getVersions(hash, name);
          }}>Versions</span>
        </Menu.Item>
        <Menu.Item id={`Update_${hash}`} key={`1${hash}`}>
          <Upload name="file" beforeUpload={(file) => {
            this.props.updateFile(file, hash);
            return false;
          }} showUploadList={false}>
            Update File
          </Upload>
        </Menu.Item>
        <Menu.Item key={`2${hash}`} onClick={() => {
          this.props.shareModal(hash, name, permission);
        }}>
          <span id={`Share_${hash}`}>Share</span>
        </Menu.Item>
      </Menu>
    );
  }

  folderMenu(hash, name, permission) {
    return (
      <Menu>
        <Menu.Item key={`0${hash}`} onClick={() => {
          this.props.shareModal(hash, name, permission);
        }}>
          <span id={`Share_${hash}`}>Share</span>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    const { entryFolders, entryFiles } = this.props.folderData;
    return (
      <>
        {
          entryFolders.map((folder, i) => (
            <div className="driveItem"
                 key={i}>
              <img width={80}
                   onDoubleClick={() => this.props.openFolder(folder.hash)}
                   src={FolderImage}
                   alt={'Folder'}
                   title={`Folder - ${folder.name}`} className="folder"/>
              <div className="itemData">
                    <span className="folderTitle"
                          onDoubleClick={() => this.props.openFolder(folder.hash)}>
                      {folder.name}
                    </span>
                <div>
                  <Dropdown
                    overlay={this.folderMenu(folder.hash, folder.name, folder.permissions)}
                    trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      <img title="More" alt="More" src={More} id={`Actions_${folder.hash}`}/>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))
        }
        {
          entryFiles.map((file, i) => (
            <div className="driveItem"
                 key={i}>
              <img src={FileImage}
                   onDoubleClick={() => this.props.downloadFile('null', file.hash)}
                   alt={'File'}
                   title={`File - ${file.name}`} className="file"/>
              <div className="itemData">
                    <span className="fileTitle"
                          onDoubleClick={() => this.props.downloadFile('null',
                            file.hash)}>{file.name}</span>
                <div>
                  <Dropdown overlay={this.fileMenu(file.hash, file.name, file.permissions)}
                            trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      <img title="More" alt="More" src={More} id={`Actions_${file.hash}`}/>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))
        }
      </>

    );
  }
}
