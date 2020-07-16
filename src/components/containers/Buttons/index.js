import React, { Component } from 'react';
import {
  Button, Upload,
} from 'antd';
import { getRootFolderHash } from '../../../utils/functions';
import './style.css';
import { NewFolder } from '..';
import goHome from '../../../assets/images/goHome.svg';
import goBack from '../../../assets/images/goBack.svg';
import fileUploadIcon from '../../../assets/images/fileUploadIcon.svg';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  beforeUpload(file) {
    this.props.uploadFile(file);
    return false;
  }

  async goHome() {
    const hash = await getRootFolderHash();
    this.props.getFolderData(hash);
  }

  async goBack() {
    if (this.props.folderData.folderHash === this.props.folderHash) {
      const hash = await getRootFolderHash();
      this.props.getFolderData(hash, this.props.mode);
    } else {
      this.props.getFolderData(this.props.folderData.parentHash);
    }
  }

  render() {
    const { userPermission } = this.props;
    const { mode } = this.props;
    return (
      <div className='buttonsWrapper'>
        <div className='navigation'>
          <div>
            {this.props.folderData.parentHash !== 'root'
              ? <div onClick={this.goHome} className="goHome">
                <img src={goHome} alt="goHome"/>
              </div>
              : <div className="goHome_inactive goHome">
                <img src={goHome} alt="goHome"/>
              </div>
            }
          </div>
          <div>
            {this.props.folderData.parentHash !== 'root'
              ? <div onClick={this.goBack} className="goBack">
                <img src={goBack} alt="goBack"/>
              </div>
              : <div className="goBack_inactive goBack">
                <img src={goBack} alt="goBack"/>
              </div>
            }
          </div>
          <div>
            {
              this.props.folderData.parentHash !== 'root'
                ? <span className="currentFolder">{this.props.folderData.folderName}</span>
                : <span className="currentFolder">{this.props.mode === 'drive'
                  ? 'My Drive' : this.props.mode === 'share'
                    ? 'Shared with me' : null}</span>
            }
          </div>
        </div>
        {
          this.props.mode === 'drive' || (this.props.folderData.parentHash !== 'root' && (userPermission === 'owner' || userPermission === 'write'))
            ? <div className="homeButtons">
              <div>
                <NewFolder onFinish={this.props.newFolder(mode)}
                            mode={mode}/>
              </div>
              <div>
                <Upload name="file" beforeUpload={this.beforeUpload} showUploadList={false}>
                  <Button className="upload-button">
                    <img src={fileUploadIcon} alt="" className="buttonIcon fileUploadIcon"/>File Upload
                  </Button>
                </Upload>
              </div>
            </div>
            : null
        }
      </div>
    );
  }
}

export default Buttons;
