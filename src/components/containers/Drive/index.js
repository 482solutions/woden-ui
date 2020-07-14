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
import { detectUserPermission } from '../../../utils/functions';

export default class Drive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPermissions: 'null',
    };
  }

  fileMenu(hash, name, filesData) {
    return (
      <Menu>
        <Menu.Item key={`0${hash}`} onClick={async() => {
          await this.props.getVersions(hash, name);
        }}>
          <span id={`Versions_${hash}`}><img className="dropdownIcon" src={fileVersionsIcon}
                                             alt=""/>Versions</span>
        </Menu.Item>
        {
          (this.state.userPermission === 'owner' || this.state.userPermission === 'write')
          && <Menu.Item id={`Update_${hash}`} key={`1${hash}`}>
            <Upload name="file" beforeUpload={(file) => {
              this.props.updateFile(file, hash);
              return false;
            }} showUploadList={false}>
              <img className="dropdownIcon" src={updateFileIcon} alt=""/>Update File
            </Upload>
          </Menu.Item>
        }
        {
          (this.state.userPermission === 'owner' || this.state.userPermission === 'write')
          && <Menu.Item key={`2${hash}`} onClick={() => {
            this.props.shareModal(hash, name, filesData);
          }}>
            <span id={`Share_${hash}`}><img className="dropdownIcon" src={Share}
                                            alt=""/>Share</span>
          </Menu.Item>
        }
        <Menu.Item key={`3${hash}`}>
          <span id={`Permissions_${hash}`} onClick={async() => {
            await this.props.viewAccessList(hash, 'file');
          }}><img className="dropdownIcon" src={accessListIcon} alt=""/>Access list</span>
        </Menu.Item>
      </Menu>
    );
  }

  folderMenu(hash, name, folderData) {
    return (
      <Menu>
        {
          (this.state.userPermission === 'owner' || this.state.userPermission === 'write')
          && <Menu.Item key={`0${hash}`} onClick={() => {
            this.props.shareModal(hash, name, folderData);
          }}>
            <span id={`Share_${hash}`}><img className="dropdownIcon" src={Share}
                                            alt=""/>Share</span>
          </Menu.Item>
        }
        <Menu.Item key={`1${hash}`} onClick={async() => {
          await this.props.viewAccessList(hash, 'folder');
        }}>
          <span id={`Permissions_${hash}`}><img className="dropdownIcon" src={accessListIcon} alt=""/>Access list</span>
        </Menu.Item>
      </Menu>
    );
  }

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
      case 'image/png':
        return fileImagePNG;
      case 'text/plain':
        return fileImageDefault;
      default:
        return fileImageDefault;
    }
  }

  detectPermission(username, hash, infoArray, type) {
    const detectPermission = detectUserPermission(username, hash, infoArray, type);
    this.setState({ userPermission: detectPermission });
    this.props.getPermission(detectPermission);
  }

  render() {
    const {
      entryFolders, entryFiles, filesInfo, foldersInfo,
    } = this.props.folderData;
    const { username } = this.props;
    return (
      <>
        {
          entryFolders.map((folder, i) => (
            <div className="driveItem"
                 key={i}>
              <img width={80}
                   onDoubleClick={() => {
                     this.detectPermission(username,
                       folder.hash,
                       foldersInfo,
                       'folder');
                     this.props.openFolder(folder.hash);
                   }}
                   src={folderImage}
                   alt={'Folder'}
                   title={`Folder - ${folder.name}`} className="folder"/>
              <div className="itemData">
                    <span className="folderTitle"
                          onDoubleClick={() => {
                            this.detectPermission(username,
                              folder.hash,
                              foldersInfo,
                              'folder');
                            this.props.openFolder(folder.hash);
                          }}>
                      {folder.name}
                    </span>
                <div>
                  <Dropdown
                    overlay={this.folderMenu(folder.hash, folder.name, username)}
                    onClick={() => this.detectPermission(username,
                      folder.hash,
                      foldersInfo,
                      'folder')}
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
                   onDoubleClick={() => this.props.downloadFile(file.hash, 'null')}
                   alt={'File'}
                   title={`File - ${file.name}`} className="file"/>
              <div className="itemData">
                <span className="fileTitle">{file.name}</span>
                <div>
                  <Dropdown overlay={this.fileMenu(file.hash, file.name)}
                            onClick={() => this.detectPermission(username,
                              file.hash,
                              filesInfo,
                              'file')}
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
