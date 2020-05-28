import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import { Buttons } from '../../components/containers';
import { getRootFolderHash } from '../../utils/functions';
import { actions } from '../../state-management';
import './style.css';
import FolderImage from '../../assets/images/folder.svg';
import FileImage from '../../assets/images/file.svg';
import More from '../../assets/images/more-vertical.svg';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.createFolder = this.createFolder.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.openFolder = this.openFolder.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  async componentDidMount() {
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash);
  }

  uploadFile(file) {
    this.props.uploadFile({ name: file.name, parentFolder: this.props.folderHash, file });
    return false;
  }

  createFolder(dataRequest) {
    this.props.createFolder({ name: dataRequest.newFolder, parentFolder: this.props.folderHash });
  }

  openFolder(hash) {
    this.props.getFolderData(hash);
  }

  downloadFile(hash) {
    this.props.downloadFile(hash);
  }

  getVersions() {
    // this.props.getVersions(hash);
  }

  fileMenu(hash) {
    return (
      <Menu>
        <Menu.Item key={`0${hash}`}>
          <span id={`Versions_${hash}`} onClick={() => {
            this.getVersions(hash);
          }}>Versions</span>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    const { entryFolders, entryFiles } = this.props;
    return (
      <div className="container flex-direction-row">
        <div>
        </div>
        <div className="main flex-direction-column w100">
          <Buttons newFolder={this.createFolder}
                   uploadFile={this.uploadFile}
                   getFolderData={this.openFolder}
                   folderName={this.props.folderName}
                   parentHash={this.props.parentHash}/>
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
                  </div>
                </div>
              ))
            }
            {
              entryFiles.map((files, i) => (
                <div className="driveItem"
                     key={i}>
                  <img src={FileImage}
                       onDoubleClick={() => this.downloadFile(files.hash, files.name)}
                       alt={'File'}
                       title={`File - ${files.name}`} className="file"/>
                  <div className="itemData">
                    <span className="fileTitle" onDoubleClick={() => this.downloadFile(files.hash,
                      files.name)}>{files.name}</span>
                    <div className="contextMenu">
                      <Dropdown overlay={this.fileMenu(files.hash)} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                          <img title="More" alt="More" src={More} id={`Actions_${files.hash}`}/>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ auth, filesystem }) => ({
  isLoggedIn: auth.isLoggedIn,
  userName: auth.user,
  folderName: filesystem.folderName,
  folderHash: filesystem.folderHash,
  parentHash: filesystem.parentHash,
  entryFolders: filesystem.entryFolders,
  entryFiles: filesystem.entryFiles,
}),
{
  changePasswordRequest: actions.changePasswordRequest,
  getFolderData: actions.getFolderData,
  createFolder: actions.createFolder,
  uploadFile: actions.uploadFile,
  downloadFile: actions.downloadFile,
})(
  Home,
);
