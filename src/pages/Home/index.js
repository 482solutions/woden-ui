import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { FolderTwoTone } from '@ant-design/icons/lib/icons';
import Woden from 'woden';
import { Sidebar, Buttons } from '../../components/containers';
import { getRootFolderHash, getTokenForHeader } from '../../utils/functions';
import { actions } from '../../state-management';
import './style.css';
import FolderImage from '../../assets/images/folder.svg';


const api = new Woden.FileSystemApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;
Bearer.apiKey = getTokenForHeader();

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

  componentDidMount() {
    const hash = getRootFolderHash();
    console.log(hash);
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

  uploadFile(file) {
    const parentFolder = this.state.folderHash;
    const { name } = file;
    console.log(file);
    api.uploadFile(
      name, parentFolder, file,
      (error, data, response) => {
        console.log('UploadFile: ', response);
      },
    );
    return false;
  }

  createFolder(data) {
    const { newFolder } = data;
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
  }

  openFolder(hash) {
    console.log(hash);
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

  render() {
    const { entryFolders, entryFiles } = this.state;
    return (
      <div className="container flex-direction-row">
        <div>
          <Sidebar/>
        </div>
        <div className="main flex-direction-column w100">
          <Buttons newFolder={this.createFolder} uploadFile={this.uploadFile}/>
          <div className="flex-start ff-rw">
            {
              entryFolders.map((folder) => (
                <div className="flex-center flex-direction-column m10"
                     key={folder.hash} onClick={() => this.openFolder(folder.hash)}>
                  <img src={FolderImage}
                       alt={'Folder'}
                       title={`Folder - ${folder.name}`}/>{folder.name}
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
  entryFolders: filesystem.entryFolders,
  currentFolder: filesystem.folderName,
}),
{
  changePasswordRequest: actions.changePasswordRequest,
  setFolderData: actions.setFolderData,
})(
  Home,
);
