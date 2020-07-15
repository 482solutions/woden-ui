import React from 'react';
import { Tree } from 'antd';
import './style.css';

const { DirectoryTree } = Tree;

const FoldersTree = ({ tree }) => (
  <DirectoryTree
    className="directoryTree"
    multiple
    defaultExpandAll
    treeData={tree}
    selectable={false}
  />
);

export default FoldersTree;
