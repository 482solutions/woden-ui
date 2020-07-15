import React from 'react';
import { Tree } from 'antd';
import './style.css';

export class FoldersTree extends React.Component {
  render() {
    const { DirectoryTree } = Tree;
    const { tree } = this.props;
    return (
      <DirectoryTree
        className="directoryTree"
        multiple
        defaultExpandAll
        treeData={tree}
        selectable={false}
      />
    );
  }
}

export default FoldersTree;
