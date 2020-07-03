import React, { Component } from 'react';
import FolderIcon from '../../../assets/images/folderIcon.svg';
import Share from '../../../assets/images/Share.svg';
import FolderTree from '../../presentations/FoldersTree';
import './style.css';

class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <h2 className="sidebarTitle">All Folders</h2>
        <div className="folders content">
          <div onClick={() => this.props.changeMode('drive')}>
            <FolderTree className="sideBarMode myDrive folderTree" onClick={() => this.props.getFoldersTree}/>
          </div>
          <div onClick={() => this.props.changeMode('share')} className="sideBarMode shared"><img src={Share} alt="Share" title="Share"/>Shared with me</div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
