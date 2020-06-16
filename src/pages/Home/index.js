import React from 'react';
import { connect } from 'react-redux';
import {
  Col, Dropdown, Menu, Row, Upload,
} from 'antd';
import { Buttons } from '../../components/containers';
import { getRootFolderHash } from '../../utils/functions';
import { actions } from '../../state-management';
import './style.css';
import FolderImage from '../../assets/images/folder.svg';
import FileImage from '../../assets/images/file.svg';
import More from '../../assets/images/more-vertical.svg';
import CloseIcon from '../../assets/images/closeIcon.svg';
import DownloadIcon from '../../assets/images/download.svg';
import { PermissionsModal } from '../../components/presentations';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileWrapperVisible: false,
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
    };
    this.createFolder = this.createFolder.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.openFolder = this.openFolder.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.getVersions = this.getVersions.bind(this);
    this.closeFileWrapper = this.closeFileWrapper.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.shareModal = this.shareModal.bind(this);
    this.changePermissions = this.changePermissions.bind(this);
  }

  async componentDidMount() {
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash);
  }

  uploadFile(file) {
    this.props.uploadFile({ name: file.name, parentFolder: this.props.folderHash, file });
    return false;
  }

  updateFile(file, hash) {
    this.props.updateFile({ fileHash: hash, file });
    return false;
  }

  createFolder(dataRequest) {
    this.props.createFolder({ name: dataRequest.newFolder, parentFolder: this.props.folderHash });
  }

  openFolder(hash) {
    this.props.getFolderData(hash);
  }

  downloadFile(cid, hash) {
    this.props.downloadFile(cid, hash);
  }

  changePermissions(data) {
    this.props.changePermissions(data);
    console.log(data);
  }

  async getVersions(hash, name) {
    this.setState({ fileWrapperVisible: true });
    this.setState({ wrapperInfo: { fileName: name, fileHash: hash } });
    await this.props.getVersions(hash);
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

  fileMenu(hash, name, permission) {
    return (
      <Menu>
        <Menu.Item key={`0${hash}`}>
          <span id={`Versions_${hash}`} onClick={async() => {
            await this.getVersions(hash, name);
          }}>Versions</span>
        </Menu.Item>
        <Menu.Item id={`Update_${hash}`} key={`1${hash}`}>
          <Upload name="file" beforeUpload={(file) => {
            this.updateFile(file, hash);
            return false;
          }} showUploadList={false}>
            Update File
          </Upload>
        </Menu.Item>
        <Menu.Item key={`2${hash}`} onClick={() => {
          this.shareModal(hash, name, permission);
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
          this.shareModal(hash, name, permission);
        }}>
          <span id={`Share_${hash}`}>Share</span>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    const {
      fileWrapperVisible, wrapperInfo, shareModalVisible, shareModalInfo,
    } = this.state;
    const {
      entryFolders, entryFiles, versions, userName,
    } = this.props;
    return (
      <div className="container flex-direction-row">
        <PermissionsModal visible={shareModalVisible} info={shareModalInfo}
                          close={this.closeShareModal} changePermissions={this.changePermissions}/>
        <div>
          {/* <code>{JSON.stringify(this.state, null, 2)}</code> */}
        </div>
        <div className="main flex-direction-column w100">
          <Buttons newFolder={this.createFolder}
                   uploadFile={this.uploadFile}
                   getFolderData={this.openFolder}
                   parentHash={this.props.parentHash}
                   folderName={this.props.folderName}/>
          <div className="flex-start ff-rw">
            {
              entryFolders.map((folder, i) => (
                <div className="driveItem"
                     key={i}>
                  <img width={80}
                       onDoubleClick={() => this.openFolder(folder.hash)}
                       src={FolderImage}
                       alt={'Folder'}
                       title={`Folder - ${folder.name}`} className="folder"/>
                  <div className="itemData">
                    <span className="folderTitle"
                          onDoubleClick={() => this.openFolder(folder.hash)}>{folder.name}</span>
                    <div>
                      <Dropdown overlay={this.folderMenu(folder.hash, folder.name, folder.permissions)}
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
                       onDoubleClick={() => this.downloadFile(file.versions[0].cid, file.hash)}
                       alt={'File'}
                       title={`File - ${file.name}`} className="file"/>
                  <div className="itemData">
                    <span className="fileTitle"
                          onDoubleClick={() => this.downloadFile(file.versions[0].cid,
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
          </div>
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
            {versions.versionList.length && versions.versionList.map((version) => {
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
                  <Col span={12} className='versionCode'><span
                    id={`Time_${version.cid}`}>{time}</span></Col>
                  <Col span={7} offset={2} className='versionAuthor'>{userName}</Col>
                  <Col span={3} className='versionDownload'>
                    <img id={`Download_${version.cid}`} onClick={() => {
                      this.downloadFile(version.cid, wrapperInfo.fileHash);
                    }} src={DownloadIcon} alt="Download" title='Download this version'/>
                  </Col>
                </Row>
              );
            })}
          </div>
        }

      </div>
    );
  }
}

export default connect(({ auth, filesystem }) => ({
  userName: auth.user.name,
  folderName: filesystem.folderName,
  folderHash: filesystem.folderHash,
  parentHash: filesystem.parentHash,
  entryFolders: filesystem.entryFolders,
  entryFiles: filesystem.entryFiles,
  versions: filesystem.versions,
}),
{
  changePasswordRequest: actions.changePasswordRequest,
  getFolderData: actions.getFolderData,
  createFolder: actions.createFolder,
  uploadFile: actions.uploadFile,
  updateFile: actions.updateFile,
  downloadFile: actions.downloadFile,
  getVersions: actions.getVersions,
  changePermissions: actions.changePermissions,
})(
  Home,
);
