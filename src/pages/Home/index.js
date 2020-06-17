import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import { Buttons, Drive, Sidebar } from '../../components/containers';
import { getRootFolderHash } from '../../utils/functions';
import { actions } from '../../state-management';
import './style.css';
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
      mode: 'myDrive',
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
  }

  async componentDidMount() {
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash);
  }

  openFolder(hash) {
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

  async changeMode(mode) {
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash, mode);
    this.setState({ mode });
  }

  render() {
    const {
      fileWrapperVisible, wrapperInfo, shareModalVisible, shareModalInfo,
      mode,
    } = this.state;
    const {
      versions, entryFiles, entryFolders, shareFolders, shareFiles,
    } = this.props;
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
                   parentHash={this.props.parentHash}
                   folderName={this.props.folderName}/>
          <div className="flex-start ff-rw">

            <Drive files={mode === 'myDrive' ? entryFiles : shareFiles } folders={mode === 'myDrive' ? entryFolders : shareFolders} updateFile={this.updateFile} shareModal={this.shareModal}
                   openFolder={this.openFolder} getVersions={this.getVersions}
                   downloadFile={this.downloadFile}/>
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
                  <Col span={7} offset={2} className='versionAuthor'>{version.user}</Col>
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
  shareFolders: filesystem.shareFolders,
  shareFiles: filesystem.shareFiles,
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
