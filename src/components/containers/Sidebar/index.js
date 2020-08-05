import React, { Component } from 'react';
import Share from '../../../assets/images/Share.svg';
import Voting from '../../../assets/images/votingSidebar.svg';
import folderImage from '../../../assets/images/folderImage.svg';
import switcherIconRight from '../../../assets/images/switcherIconRight.svg';
import FolderTree from '../../presentations/FoldersTree';
import './style.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h2 className="sidebarTitle">All Folders</h2>
        <div className="folders content">
          <div className="folderWrapper">
            <img src={switcherIconRight} onClick={this.props.getFoldersTree} alt=""
                 className="switcherIconRight"/>
            <img src={folderImage} className="folderImage" alt=""/>
            <div className="sideBarMode myDrive folderTree"
                 onClick={() => this.props.changeMode('drive')}>My Drive
            </div>
          </div>
          <FolderTree tree={this.props.tree}
                      openFolder={this.props.openFolder}
                      className="foldersTree"/>
          <div onClick={() => this.props.changeMode('share')}
               className="sideBarMode shared">
            <img src={Share} alt="Share"
                 title="Share"/>Shared with me
          </div>

        </div>
        <div onClick={() => this.props.changeMode('voting')}
             className="sideBarMode shared">
          <img src={Voting} alt="Voting"
               title="Voting"/>Voting
        </div>
      </div>
    );
  }
}

export default Sidebar;
