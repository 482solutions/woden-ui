import React, { Component } from 'react';
import FolderIcon from '../../../assets/images/folderIcon.svg';
import Share from '../../../assets/images/Share.svg';
import FolderTree from '../../presentations/FoldersTree';
import './style.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeVisible: false,
    }
    this.showTree = this.showTree.bind(this);
  }

  showTree() {
    this.setState({treeVisible: true});
    console.log('treeVisible: ', this.state.treeVisible);
    return (
      <FolderTree visible={this.state.treeVisible}/>
    )
  }

  render() {
    return (
      <div className="sidebar">
        <h2 className="sidebarTitle">All Folders</h2>
        <div className="folders content">
          <span onClick={() => this.props.changeMode('drive')}  className="sideBarMode myDrive"><img src={FolderIcon} alt="My Drive" title="My Drive" onClick={() => this.showTree()}/>My Drive</span>
          <span onClick={() => this.props.changeMode('share')} className="sideBarMode shared"><img src={Share} alt="Share" title="Share" onClick={() => this.showTree()}/>Shared with me</span>
        </div>
      </div>
    );
  }
}

export default Sidebar;
