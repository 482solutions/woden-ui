import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FolderTwoTone } from '@ant-design/icons/lib/icons';
import { actions } from '../../../state-management';

class Data extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      folders: props.entryFolders,
      files: props.entryFiles,
    };
  }

  render() {
    const { folders, files } = this.state;
    const { entryFolders } = this.props;
    console.log('Folders:', folders);
    return (
      <div>
        {
          folders.map((folder) => (
            <div key={folder.hash}><FolderTwoTone/>{folder.name}</div>
          ))
        }
      </div>
    );
  }
}

export default connect(({ auth, filesystem }) => ({
  isLoggedIn: auth.isLoggedIn,
}), { getFolderData: actions.getFolderData })(Data);
