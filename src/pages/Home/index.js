import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import { Buttons, Drive, Sidebar } from '../../components/containers';
import { getRootFolderHash } from '../../utils/functions';
import { actions } from '../../state-management';
import './style.css';
import CloseIcon from '../../assets/images/closeIcon.svg';
import DownloadIcon from '../../assets/images/download.svg';
import emptyHere from '../../assets/images/emptyHere.svg';
import revokeAccessIcon from '../../assets/images/revokeAccessIcon.svg';
import editorIcon from '../../assets/images/editorIcon.svg';
import viewerIcon from '../../assets/images/viewerIcon.svg';
import { PermissionsModal } from '../../components/presentations';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileWrapperVisible: false,
      accessListVisible: false,
      userPermission: 'null',
      folderHash: 'null',
      permissionData: {
        title: 'null',
        hash: null,
        ownerId: 'null',
        readUsers: [],
        writeUsers: [],
      },
      wrapperInfo: {
        fileName: 'null',
        fileHash: null,
      },
      shareModalVisible: false,
      shareModalInfo: {
        title: null,
        hash: null,
        userPermissions: null,
      },
      foldersTreeData: {
        title: 'null',
        key: 'null',
        children: null,
      },
      mode: 'drive',
    };
    this.createFolder = this.createFolder.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.getVersions = this.getVersions.bind(this);
    this.openFolder = this.openFolder.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.closeFileWrapper = this.closeFileWrapper.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.shareModal = this.shareModal.bind(this);
    this.changePermissions = this.changePermissions.bind(this);
    this.revokePermissions = this.revokePermissions.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.viewAccessList = this.viewAccessList.bind(this);
    this.closeAccessList = this.closeAccessList.bind(this);
    this.getFoldersTree = this.getFoldersTree.bind(this);
    this.getPermission = this.getPermission.bind(this);
  }

  async componentDidMount() {
    this.props.initialFilesystem();
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash, this.state.mode);
  }

  async openFolder(hash) {
    const rootHash = await getRootFolderHash();
    if (rootHash === this.props[this.state.mode].folderHash) {
      this.setState({ folderHash: hash });
    }
    this.props.getFolderData(hash, this.state.mode);
  }

  uploadFile(file, mode) {
    this.props.uploadFile({
      name: file.name,
      parentFolder: this.state.mode === 'drive' ? this.props.drive.folderHash : this.props.share.folderHash,
      file,
    }, mode);
    return false;
  }


  updateFile(file, hash) {
    this.props.updateFile({ fileHash: hash, file });
    return false;
  }

  createFolder(dataRequest, mode) {
    this.props.createFolder({
      name: dataRequest.newFolder,
      parentFolder: this.state.mode === 'drive' ? this.props.drive.folderHash : this.props.share.folderHash,
    }, mode);
  }

  downloadFile(hash, cid, name) {
    this.props.downloadFile(hash, cid, name);
  }

  changePermissions(data) {
    this.props.changePermissions(data);
  }

  revokePermissions(data) {
    this.props.revokePermissions(data);
  }

  async getVersions(hash, name) {
    this.setState({ fileWrapperVisible: true });
    this.setState({ wrapperInfo: { fileName: name, fileHash: hash } });
    await this.props.getVersions(hash);
  }

  async viewAccessList(hash, type) {
    this.setState({ accessListVisible: true });
    const infoArray = (type === 'file' ? this.props[this.state.mode].filesInfo : this.props[this.state.mode].foldersInfo);
    let info = {};
    for (let i = 0; i < infoArray.length; i++) {
      if (infoArray[i][`${type}Hash`] === hash) {
        info = infoArray[i];
        break;
      }
    }
    this.setState({
      permissionData: {
        title: info[`${type}Name`],
        hash: info[`${type}Hash`],
        ownerId: info.ownerId,
        readUsers: info.readUsers,
        writeUsers: info.writeUsers,
      },
    });
    this.props.updatePermission(info);
  }

  shareModal(hash, name, permission) {
    this.setState({ shareModalVisible: true });
    this.setState({
      shareModalInfo: {
        title: name,
        hash,
        userPermissions: permission,
      },
    });
  }

  closeShareModal() {
    this.setState({ shareModalVisible: false });
    this.setState({
      shareModalInfo: {
        title: null,
        hash: null,
        userPermissions: null,
      },
    });
  }

  closeFileWrapper() {
    this.setState({ fileWrapperVisible: false });
  }

  closeAccessList() {
    this.setState({ accessListVisible: false });
  }

  async changeMode(mode) {
    if (mode !== this.state.mode) {
      const hash = await getRootFolderHash();
      this.props.getFolderData(hash, mode);
      this.setState({ mode });
    }
  }

  getFoldersTree() {
    this.props.getFoldersTree();
  }

  getPermission(permission) {
    this.setState({ userPermission: permission });
  }

  render() {
    const {
      fileWrapperVisible, accessListVisible, wrapperInfo, permissionData, shareModalVisible,
      shareModalInfo, mode,
    } = this.state;
    const { versions } = this.props;
    const { permissions } = this.props;
    return (
      <div className="container flex-direction-row">
        <PermissionsModal visible={shareModalVisible} info={shareModalInfo}
                          close={this.closeShareModal} changePermissions={this.changePermissions}/>
        <div>
          <Sidebar changeMode={this.changeMode}
                   getFoldersTree={this.getFoldersTree}
                   openFolder={this.openFolder}
                   tree={this.props.tree}/>
        </div>
        <div className="main flex-direction-column w100">
          <Buttons newFolder={this.createFolder}
                   uploadFile={this.uploadFile}
                   getFolderData={this.openFolder}
                   getPermission={this.getPermission}
                   mode={mode}
                   folderData={this.props[mode]}
                   folderHash={this.state.folderHash}
                   userPermission={this.state.userPermission}
                   username={this.props.userName}/>
          {this.props[mode].entryFolders.length + this.props[mode].entryFiles.length === 0
            ? <div className="emptyHere">
              <img src={emptyHere} alt=""/>
            </div>
            : <div className="flex-start ff-rw">
              <Drive folderData={this.props[mode]}
                     username={this.props.userName}
                     updateFile={this.updateFile}
                     shareModal={this.shareModal}
                     openFolder={this.openFolder}
                     getVersions={this.getVersions}
                     downloadFile={this.downloadFile}
                     viewAccessList={this.viewAccessList}
                     getPermission={this.getPermission}/>
            </div>
          }
        </div>
        {
          fileWrapperVisible && <div id='VersionWrapper'
                                     className="fileInfoWrapper">
            <Row justify="center" align="middle" style={{ width: '100%', height: '35px' }}>
              <Col className='infoTitle' span={20}>{wrapperInfo.fileName}</Col>
              <Col id='CloseVersionsWrapper' className='closeButton' span={3} offset={1}>
                <img onClick={this.closeFileWrapper} alt='Close' title='Close info'
                     src={CloseIcon}/>
              </Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col span={10} className='infoColumnTitle'>Versions</Col>
            </Row>
            {
              versions.versionList.length > 0 && versions.versionList.map((version) => {
                const time = new Date(version.time * 1000).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: 'numeric',
                  hour12: false,
                  minute: '2-digit',
                });
                return (
                  <Row key={version.cid} style={{ width: '100%' }}>
                    <span id={`CID_${version.cid}`} style={{ display: 'none' }}>{version.cid}</span>
                    <Col span={10} className='versionCode'><span
                      id={`Time_${version.cid}`}>{time}</span></Col>
                    <Col offset={1} span={10} className='versionAuthor'>{version.user}</Col>
                    <Col span={3} className='versionDownload'>
                      <img id={`Download_${version.cid}`} onClick={() => {
                        this.downloadFile(wrapperInfo.fileHash, version.cid);
                      }} src={DownloadIcon} alt="Download" title='Download this version'/>
                    </Col>
                  </Row>
                );
              })
            }
          </div>
        }
        {
          accessListVisible && <div id='AccessList' className="accessListWrapper">
            <Row justify="center" align="middle" style={{ width: '100%', height: '35px' }}>
              <Col className='infoTitle' title={permissionData.title}
                   span={20}>{permissionData.title}</Col>
              <Col id='CloseVersionsWrapper' className='closeButton' span={3} offset={1}>
                <img onClick={this.closeAccessList} alt='Close' title='Close info'
                     src={CloseIcon}/>
              </Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col span={10} className='infoColumnTitle'>Permissions</Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col>
                <span className="ownerName"><span
                  className='owner'>Owner: </span>{permissionData.ownerId}</span>
              </Col>
            </Row>
            <Col>
              {
                permissions.writeUsers.map((user, i) => (
                  <Row key={user} className='sharedUser editor'>
                    <Col className="sharedUserName">
                      {permissions.writeUsers[i]}
                    </Col>
                    <Col className="permissionIcons">
                      <Col className="sharedUserAccess">
                        <img src={editorIcon} title="View and update" alt=""/>
                      </Col>
                      <Col className="revokeAccess">
                        {
                          (this.state.userPermission === 'owner' || this.state.userPermission === 'write')
                          && <img src={revokeAccessIcon} alt="Revoke access"
                                  onClick={() => {
                                    this.revokePermissions({
                                      user: permissions.writeUsers[i],
                                      hash: permissionData.hash,
                                      permission: 'unwrite',
                                    });
                                  }}/>
                        }
                      </Col>
                    </Col>
                  </Row>
                ))
              }
              {permissions.readUsers.map((user, i) => (
                !permissions.writeUsers.includes(user)
                && <Row key={user} className='sharedUser viewer'>
                  <Col className="sharedUserName">
                    {permissionData.readUsers[i]}
                  </Col>
                  <Col className="permissionIcons">
                    <Col className="sharedUserAccess">
                      <img src={viewerIcon} title="View only" alt=""/>
                    </Col>
                    <Col className="revokeAccess">
                      {
                        (this.state.userPermission === 'owner' || this.state.userPermission === 'write')
                        && <img src={revokeAccessIcon} alt="Revoke access"
                                onClick={() => {
                                  this.revokePermissions({
                                    user: permissions.readUsers[i],
                                    hash: permissionData.hash,
                                    permission: 'unread',
                                  });
                                }}/>
                      }
                    </Col>
                  </Col>
                </Row>
              ))
              }
            </Col>
          </div>
        }
      </div>
    );
  }
}

export default connect(({ auth, filesystem, permissions }) => ({
  userName: auth.user.name,
  versions: filesystem.versions,
  drive: filesystem.drive,
  share: filesystem.share,
  tree: filesystem.tree,
  permissions,
}),
{
  changePasswordRequest: actions.changePasswordRequest,
  initialFilesystem: actions.initialFilesystem,
  getFolderData: actions.getFolderData,
  createFolder: actions.createFolder,
  uploadFile: actions.uploadFile,
  updateFile: actions.updateFile,
  downloadFile: actions.downloadFile,
  getVersions: actions.getVersions,
  changePermissions: actions.changePermissions,
  revokePermissions: actions.revokePermissions,
  getFoldersTree: actions.getFoldersTree,
  updateFolderData: actions.updateFolderData,
  updatePermission: actions.updatePermission,
})(
  Home,
);
