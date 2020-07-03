import React, { Component } from 'react';
import Share from '../../../assets/images/Share.svg';
import FolderTree from '../../presentations/FoldersTree';
import './style.css';

class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <h2 className="sidebarTitle">All Folders</h2>
        <div className="folders content">
          <div className="test" onClick={this.props.getFoldersTree}>test</div>
          <div  className="folderWrapper">
            <FolderTree className="sideBarMode myDrive folderTree" onClick={() => this.props.changeMode('drive')} tree={this.props.tree} />
          </div>
          <div onClick={() => this.props.changeMode('share')} className="sideBarMode shared"><img src={Share} alt="Share" title="Share"/>Shared with me</div>
        </div>
        <pre>{JSON.stringify(this.props.tree, null, 2)}</pre>
      </div>
    );
  }
}

export default Sidebar;
