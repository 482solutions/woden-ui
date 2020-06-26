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
import { PermissionsModal } from '../../components/presentations';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileWrapperVisible: false,
      accessListVisible: false,
      accessListInfo: {
        fileName: 'null',
        fileHash: null,
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
    this.changeMode = this.changeMode.bind(this);
    this.viewAccessList = this.viewAccessList.bind(this);
    this.closeAccessList = this.closeAccessList.bind(this);
  }

  async componentDidMount() {
    this.props.initialFilesystem();
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash, this.state.mode);
  }

  openFolder(hash) {
    this.props.getFolderData(hash, this.state.mode);
  }

  uploadFile(file) {
    this.props.uploadFile({ name: file.name, parentFolder: this.props.drive.folderHash, file });
    return false;
  }

  updateFile(file, hash) {
    this.props.updateFile({ fileHash: hash, file });
    return false;
  }

  createFolder(dataRequest) {
    this.props.createFolder({
      name: dataRequest.newFolder,
      parentFolder: this.props.drive.folderHash,
    });
  }

  downloadFile(cid, hash) {
    this.props.downloadFile(cid, hash);
  }

  changePermissions(data) {
    this.props.changePermissions(data);
  }

  async getVersions(hash, name) {
    this.setState({ fileWrapperVisible: true });
    this.setState({ wrapperInfo: { fileName: name, fileHash: hash } });
    await this.props.getVersions(hash);
  }

   viewAccessList(name, hash, permission) {
    this.setState({accessListVisible: true});
    this.setState({ accessListInfo: { fileName: name, fileHash: hash } });
    this.props.viewAccessList(permission)
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

  render() {
    const {
      fileWrapperVisible, accessListVisible, wrapperInfo, accessListInfo, shareModalVisible,
      shareModalInfo, mode,
    } = this.state;
    const { versions, permissions } = this.props;
    return (
      <div className="container flex-direction-row">
        <PermissionsModal visible={shareModalVisible} info={shareModalInfo}
                          close={this.closeShareModal} changePermissions={this.changePermissions}/>
        <div>
          <Sidebar changeMode={this.changeMode}/>
        </div>
        <div className="main flex-direction-column w100">
          <Buttons newFolder={this.createFolder}
                   uploadFile={this.uploadFile}
                   getFolderData={this.openFolder}
                   mode={mode}
                   folderData={this.props[mode]}
                   />
          {
            this.props[mode].entryFolders.length + this.props[mode].entryFiles.length === 0 ?
              <div className="emptyHere">
                <img src={emptyHere} alt=""/>
              </div> :
              <div className="flex-start ff-rw">
                <Drive folderData={this.props[mode]}
                       updateFile={this.updateFile}
                       shareModal={this.shareModal}
                       openFolder={this.openFolder}
                       getVersions={this.getVersions}
                       downloadFile={this.downloadFile}
                       accessList={this.viewAccessList}/>
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
                      this.downloadFile(version.cid, wrapperInfo.fileHash);
                    }} src={DownloadIcon} alt="Download" title='Download this version'/>
                  </Col>
                </Row>
              );
            })
            }
          </div>
        }
        {
          accessListVisible && <div id='AccessList'
                                     className="accessListWrapper">
            <Row justify="center" align="middle" style={{ width: '100%', height: '35px' }}>
              <Col className='infoTitle' span={20}>{accessListInfo.fileName}</Col>

              <Col id='CloseVersionsWrapper' className='closeButton' span={3} offset={1}>
                <img onClick={this.closeAccessList} alt='Close' title='Close info'
                     src={CloseIcon}/>
              </Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col span={10} className='infoColumnTitle'>Permissions</Col>
            </Row>
            {
              permissions.accessList.length > 0 &&  permissions.accessList.map(() => {
                return (
                  <Row key={permissions.permissions} style={{ width: '100%' }}>
                    <Col>
                      <span className='accessUser'>{}</span>
                    </Col>
                  </Row>
                );
              })
            }
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
  mode: filesystem.mode,
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
})(
  Home,
);
