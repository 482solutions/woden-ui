import React, { Component } from 'react';
import { Tree } from 'antd';
import { DownOutlined, TeamOutlined } from '@ant-design/icons';
import './style.css';

const { TreeNode } = Tree;

class Sidebar extends Component {
  onSelect(selectedKeys, info) {
    console.log('selected', selectedKeys, info);
  }

  render() {
    return (
      <div className="sidebar">
        <h2 className="sidebar__title">All Folders</h2>
        <div className="folders content">
          <Tree
            showLine
            switcherIcon={<DownOutlined/>}
            defaultExpandedKeys={['0-0-0']}
            onSelect={this.onSelect}
            className="tree"
          >
            <TreeNode title="Root" key="0-0">
              <TreeNode title="Example-1.1" key="0-0-0-0"/>
              <TreeNode title="Example-1.2" key="0-0-0-1"/>
              <TreeNode title="Example-1.3" key="0-0-0-2"/>
            </TreeNode>
          </Tree>
          <a href="#" className="shared"><TeamOutlined/> Shared with me</a>
        </div>
      </div>
    );
  }
}

export default Sidebar;