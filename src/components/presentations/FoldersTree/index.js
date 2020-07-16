import React from 'react';
import { Tree } from 'antd';
import folderImage from '../../../assets/images/folderImage.svg';
import './style.css';

export class FoldersTree extends React.Component {
  onSelect() {
    console.log('onSelect');
  }

  showIcon() {
    return (
      <img src={folderImage} className="smallFolderImage" alt=""/>
    );
  }

  render() {
    const { DirectoryTree } = Tree;
    const { tree } = this.props;

    return (
      <DirectoryTree
        className="directoryTree"
        multiple
        treeData={tree}
        selectable={false}
        onSelect={this.onSelect}
        icon={this.showIcon}
      />
    );
  }
}

export default FoldersTree;
