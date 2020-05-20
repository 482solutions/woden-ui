import React from 'react';
import { connect } from 'react-redux';
import { Buttons, Sidebar } from '../../components/containers';
import { getRootFolderHash } from '../../utils/functions';
import { actions } from '../../state-management';
import './style.css';
import FolderImage from '../../assets/images/folder.svg';
import FileImage from '../../assets/images/file.svg';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.createFolder = this.createFolder.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
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

  render() {
    const { entryFolders, entryFiles } = this.props;
    return (
      <div className="container flex-direction-row">
        <div>
          <Sidebar/>
        </div>
        <div className="main flex-direction-column w100">
          <Buttons newFolder={this.createFolder} uploadFile={this.uploadFile}/>
          <div className="flex-start ff-rw">
            {
              entryFolders.map((folder, i) => (
                <div className="flex-center flex-direction-column m10"
                     key={i} onClick={() => this.openFolder(folder.hash)}>
                  <img src={FolderImage}
                       alt={'Folder'}
                       title={`Folder - ${folder.name}`}/>{folder.name}
                </div>
              ))
            }
            {
              entryFiles.map((files, i) => (
                <div className="flex-center flex-direction-column m10 folderFileSize"
                     key={i} onClick={() => this.downloadFile(files.hash, files.name)}>
                  <img src={FileImage}
                       alt={'File'}
                       title={`File - ${files.name}`}/>{files.name}
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
