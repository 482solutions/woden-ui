import React from 'react';
import { Tree } from 'antd';
import './style.css';


const foldersTree = ({ tree }) => (
  <Tree
    className="directoryTree"
    multiple
    defaultExpandAll
    treeData={tree}
    selectable={false}
  />
);

export default foldersTree;
