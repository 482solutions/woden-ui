import React from 'react';
import { Tree } from 'antd';
import folderImage from '../../../assets/images/folderImage.svg';
import './style.css';

export class FoldersTree extends React.Component {
  showIcon() {
    return (
      <img src={folderImage} className="smallFolderImage" alt=""/>
    );
  }

  render() {
    const { DirectoryTree } = Tree;
    const { tree } = this.props;

    const onSelect = (keys, event) => {
      this.props.openFolder(event.key);
    };

    return (
      <DirectoryTree
        className="directoryTree"
        multiple
        treeData={tree}
        selectable={false}
        onClick={onSelect}
        height={1000}
        icon={this.showIcon}
      />
    );
  }
}

export default FoldersTree;
