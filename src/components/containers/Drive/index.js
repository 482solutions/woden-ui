import React, { Component } from 'react';
import './style.css';
import { Dropdown, Menu, Upload } from 'antd';
import folderImage from '../../../assets/images/folderImage.svg';
import More from '../../../assets/images/more-vertical.svg';
import Share from '../../../assets/images/Share.svg';
import accessListIcon from '../../../assets/images/accessListIcon.svg';
import updateFileIcon from '../../../assets/images/updateFileIcon.svg';
import fileVersionsIcon from '../../../assets/images/fileVersionsIcon.svg';
import fileImageDefault from '../../../assets/images/fileImages/fileImageDefault.svg';
import fileImageAI from '../../../assets/images/fileImages/fileImageAI.svg';
import fileImageAU from '../../../assets/images/fileImages/fileImageAU.svg';
import fileImagePNG from '../../../assets/images/fileImages/fileImagePNG.svg';
import fileImageJPG from '../../../assets/images/fileImages/fileImageJPG.svg';
import fileImagePDF from '../../../assets/images/fileImages/fileImagePDF.svg';
import fileImagePSD from '../../../assets/images/fileImages/fileImagePSD.svg';
import fileImageSVG from '../../../assets/images/fileImages/fileImageSVG.svg';

export default class Drive extends Component {
  constructor(props) {
    super(props);
  }

  fileMenu(hash, name, permission, user) {
    return (
      <Menu>
        <Menu.Item key={`0${hash}`} onClick={async () => {
          await this.props.getVersions(hash, name);
        }}>
          <span id={`Versions_${hash}`}><img className="dropdownIcon" src={fileVersionsIcon}
                                             alt=""/>Versions</span>
        </Menu.Item>
        {
          (permission.writeUsers.includes(user) || permission.ownerId === user) &&
          <Menu.Item id={`Update_${hash}`} key={`1${hash}`}>
            <Upload name="file" beforeUpload={(file) => {
              this.props.updateFile(file, hash);
              return false;
            }} showUploadList={false}>
              <img className="dropdownIcon" src={updateFileIcon} alt=""/>Update File
            </Upload>
          </Menu.Item>
        }
        {
          (permission.writeUsers.includes(user) || permission.ownerId === user) &&
          <Menu.Item key={`2${hash}`} onClick={() => {
            this.props.shareModal(hash, name, permission);
          }}>
            <span id={`Share_${hash}`}><img className="dropdownIcon" src={Share}
                                            alt=""/>Share</span>
          </Menu.Item>
        }
        <Menu.Item key={`3${hash}`}>
          <span id={`Permissions_${hash}`} onClick={async () => {
            await this.props.viewAccessList(hash, 'file');
          }}><img className="dropdownIcon" src={accessListIcon} alt=""/>Access list</span>
        </Menu.Item>
      </Menu>
    );
  }

  folderMenu(hash, name, permission, user) {
    console.log(permission);
    console.log(user);
    return (
      <Menu>
        {
          <Menu.Item key={`0${hash}`} onClick={() => {
            this.props.shareModal(hash, name, permission);
          }}>
            <span id={`Share_${hash}`}><img className="dropdownIcon" src={Share}
                                            alt=""/>Share</span>
          </Menu.Item>
        }
        <Menu.Item key={`1${hash}`} onClick={async () => {
          await this.props.viewAccessList(hash, 'folder');
        }}>
          <span><img className="dropdownIcon" src={accessListIcon} alt=""/>Access list</span>
        </Menu.Item>
      </Menu>
    );
  }

  fileType

  detectImage(file) {
    switch (file.fileType) {
      case 'application/pdf':
        return fileImagePDF;
      case 'image/jpeg':
        return fileImageJPG;
      case 'image/vnd.adobe.photoshop':
        return fileImagePSD;
      case 'image/svg+xml':
        return fileImageSVG;
      case 'audio/basic':
        return fileImageAU;
      case 'application/ai':
        return fileImageAI;
      case 'image/png' :
        return fileImagePNG
      case 'text/plain' :
        return fileImageDefault;
      default:
        return fileImageDefault;
    }
  }

  render() {
    const { entryFolders, entryFiles, filesInfo } = this.props.folderData;
    const username = this.props.username;
    return (
      <>
        {
          entryFolders.map((folder, i) => (
            <div className="driveItem"
                 key={i}>
              <img width={80}
                   onDoubleClick={() => this.props.openFolder(folder.hash)}
                   src={folderImage}
                   alt={'Folder'}
                   title={`Folder - ${folder.name}`} className="folder"/>
              <div className="itemData">
                    <span className="folderTitle"
                          onDoubleClick={() => this.props.openFolder(folder.hash)}>
                      {folder.name}
                    </span>
                <div>
                  <Dropdown
                    overlay={this.folderMenu(folder.hash, folder.name, filesInfo[i])}
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
              <img src={this.detectImage(filesInfo[i])}
                   onDoubleClick={() => this.props.downloadFile(file.name, file.fileHash,
                     'null')}
                   alt={'File'}
                   title={`File - ${file.name}`} className="file"/>
              <div className="itemData">
                    <span className="fileTitle"
                          onDoubleClick={() => this.props.downloadFile(file.name, file.fileHash,
                            'null')}>{file.name}</span>
                <div>
                  <Dropdown overlay={this.fileMenu(file.hash, file.name, filesInfo[i], username)}
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

