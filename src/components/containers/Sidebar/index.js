import React, { Component } from 'react';
import FolderIcon from '../../../assets/images/folderIcon.svg';
import ShareFolders from '../../../assets/images/shareFolders.svg';

import './style.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <h2 className="sidebarTitle">All Folders</h2>
        <div className="folders content">
          <span onClick={() => this.props.changeMode('drive')} className="sideBarMode myDrive"><img src={FolderIcon} alt="My Drive" title="My Drive"/>MyDrive</span>
          <span onClick={() => this.props.changeMode('share')} className="sideBarMode shared"><img src={ShareFolders} alt="Share" title="Share"/>Shared with me</span>
        </div>
      </div>
    );
  }
}

export default Sidebar;
