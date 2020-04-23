import React from 'react';
import {connect} from 'react-redux';
import {Typography, Modal} from "antd";
import {CreateForm, Data} from "../../presentations";
import {schemes, functions} from "../../../utils";
import {actions} from "../../../state-management";

import './style.css';

const { Title } = Typography;

class Folders extends React.Component {
  state = {
    isModalOpen: false
  };

  setModalVisibility = (isModalOpen) => {
    this.setState({
      isModalOpen
    })
  };

  isInSharedFolder = () => {
    const { directory } = this.props.filesystem;
    return directory.split('/')[1] === 'shared';
  };

  isSharedDir = (path) => {
    const couldBeShared = path.split('/').slice(-2);
    return couldBeShared[0] === 'shared' || couldBeShared[1] === 'shared'
  };

  hasEditPermission = () => {
    const { filesystem: {directory}, permissions, auth } = this.props;

    if (this.isInSharedFolder() && !this.isSharedDir(directory)) {
      return permissions.info[directory] && !permissions.info[directory].view.includes(auth.user.name) && (
        permissions.info[directory].edit.includes(auth.user.name)
      );
    }

    return !this.isSharedDir(directory);
  };

  createDirectory = ({ name }) => {
    this.props.createDirectory(name);
    this.setModalVisibility(false);
  };

  getDirectories = () => {
    const { directory, entries } = this.props.filesystem;

    const currentDir = functions.getCurrentDirectory(directory, entries);

    return currentDir.filter((curr) => typeof curr !== 'string').map(element => {
      if (this.isInSharedFolder() && !this.isSharedDir(directory)) {
        this.props.loadPermissions(`${directory}/${element.directory}`);
      }
      return {
        ...element,
        parent: directory,
      }
    });
  };

  showPermissions = (parent, directory) => {
    if (this.isSharedDir(`${parent}/${directory}`)) {
      return;
    }
    this.props.showPermissions(`${parent}/${directory}`)
  };

  onClick = (dir) => {
    this.props.setSelected({ type: "folder", name: dir.directory });
    this.showPermissions(dir.parent, dir.directory);
  };

  onDoubleClick = (dir) => {
    this.props.goForward(dir.directory);
    this.props.setUnselected();
  };

  render() {
    let { selected } = this.props.filesystem;
    return (
      <>
        <Title level={4}>Folders</Title>
        <div className="flex-start ff-rw">
          {
            this.hasEditPermission() && (
              <Data
                type="folder-add"
                name="Create folder"
                onClick={() => this.setModalVisibility(true)}
              />
            )
          }
          {
            this.getDirectories().map((i) => (
              <Data
                key={i.directory}
                type="folder"
                name={i.directory}
                onClick={() => this.onClick(i)}
                onDoubleClick={() => this.onDoubleClick(i)}
                selected={selected.type === "folder" && selected.name === i.directory} />
            ))
          }
          <Modal
            title="Set folder name"
            visible={this.state.isModalOpen}
            centered
            footer={null}
            onCancel={() => this.setModalVisibility(false)}
          >
            <CreateForm
              layout="horizontal"
              onSubmit={this.createDirectory}
              scheme={schemes.createDirectory()}
              buttonName="Create"
              className="flex-direction-column flex-center"
            />
          </Modal>
        </div>
      </>
    );
  }
}

export default connect(
  ({ filesystem, permissions, auth }) => ({ filesystem, permissions, auth }),
  {
    createDirectory: actions.createDirectory,
    goForward: actions.goForward,
    showPermissions: actions.showPermissions,
    loadPermissions: actions.loadPermissions,
    setSelected: actions.setSelected,
    setUnselected: actions.setUnselected
  },
)(Folders);
