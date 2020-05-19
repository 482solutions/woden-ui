import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import download from 'downloadjs';
import Woden from 'woden';
import { Sidebar, Buttons } from '../../components/containers';
import { getRootFolderHash, getTokenForHeader } from '../../utils/functions';
import { actions } from '../../state-management';
import './style.css';
import FolderImage from '../../assets/images/folder.svg';
import FileImage from '../../assets/images/file.svg';


const api = new Woden.FileSystemApi();
const defaultClient = Woden.ApiClient.instance;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: null,
      folderHash: null,
      parentHash: null,
      entryFolders: [],
      entryFiles: [],
    };
    this.createFolder = this.createFolder.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  async componentDidMount(){
    const { Bearer } = defaultClient.authentications;
    Bearer.apiKey = await getTokenForHeader();
    const hash = await getRootFolderHash();
    api.getFolder(
      hash,
      (error, data, response) => {
        if (error) {
          message.error(response.body.message);
        } else {
          const folderData = response.body.folder;
          folderData.folders = JSON.parse(folderData.folders);
          folderData.files = JSON.parse(folderData.files);
          this.props.setFolderData(folderData);
          this.setState({
            folderName: folderData.name,
            folderHash: folderData.hash,
            parentHash: folderData.parenthash,
            entryFolders: folderData.folders,
            entryFiles: folderData.files,
          });
        }
      },
    );
  }

  async uploadFile(file){
    const parentFolder = this.state.folderHash;
    const { name } = file;
    api.uploadFile(
      name, parentFolder, file,
      (error, data, response) => {
        if (error) {
          message.error(response.body.message);
        } else if (response.status === 200) {
          message.success('Folder created successful');
          const folderData = response.body.folder;
          folderData.folders = JSON.parse(folderData.folders);
          folderData.files = JSON.parse(folderData.files);
          this.props.setFolderData(folderData);
          this.setState({
            folderName: folderData.name,
            folderHash: folderData.hash,
            parentHash: folderData.parenthash,
            entryFolders: folderData.folders,
            entryFiles: folderData.files,
          });
        }
      },
    );
    return false;
  }

  createFolder(dataRequest) {
    const { newFolder } = dataRequest;
    const parentFolder = this.state.folderHash;
    const body = new Woden.CreateFolder();
    body.name = newFolder;
    body.parentFolder = parentFolder;
    api.createFolder(
      body,
      (error, data, response) => {
        if (error) {
          message.error(response.body.message);
        } else if (response.status === 201) {
          const folderData = response.body.folder;
          folderData.folders = JSON.parse(folderData.folders);
          folderData.files = JSON.parse(folderData.files);
          this.props.setFolderData(folderData);
          this.setState({
            folderName: folderData.name,
            folderHash: folderData.hash,
            parentHash: folderData.parenthash,
            entryFolders: folderData.folders,
            entryFiles: folderData.files,
          });
        }
      },
    );
  }

  openFolder(hash) {
    api.getFolder(
      hash,
      (error, data, response) => {
        if (error) {
          message.error(response.body.message);
        } else {
          const folderData = response.body.folder;
          folderData.folders = JSON.parse(folderData.folders);
          folderData.files = JSON.parse(folderData.files);
          this.props.setFolderData(folderData);
          this.setState({
            folderName: folderData.name,
            folderHash: folderData.hash,
            parentHash: folderData.parenthash,
            entryFolders: folderData.folders,
            entryFiles: folderData.files,
          });
        }
      },
    );
  }

  downloadFile(hash) {
    api.downloadFile(
      hash,
      (error, data, response) => {
        if (error) {
          message.error(response.body.message);
        } else {
          const { name, type, file } = response.body;
          download(file, name, type);
        }
      },
    );
  }

  render() {
    return (
      <div className="container flex-direction-row">
        <div>
          <Sidebar/>
        </div>
        <div className="main flex-direction-column w100">
          <Buttons newFolder={this.createFolder} uploadFile={this.uploadFile}/>
          <div className="flex-start ff-rw">
            {
              this.state.entryFolders.map((folder, i) => (
                <div className="flex-center flex-direction-column m10"
                     key={i} onClick={() => this.openFolder(folder.hash)}>
                  <img src={FolderImage}
                       alt={'Folder'}
                       title={`Folder - ${folder.name}`}/>{folder.name}
                </div>
              ))
            }
            {
              this.state.entryFiles.map((files, i) => (
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

export default connect(({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
  userName: auth.user,
}),
{
  changePasswordRequest: actions.changePasswordRequest,
  setFolderData: actions.setFolderData,
})(
  Home,
);
