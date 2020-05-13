import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../state-management';

class Data extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const rootFolder = localStorage.getItem('rootFolder');
    if (rootFolder) {
      console.log(this.props.getFolderData(rootFolder));
    }
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <img src="" alt=""/>
      </div>
    );
  }
}

export default connect(({ auth, filesystem }) => ({
  isLoggedIn: auth.isLoggedIn,
  directory: filesystem.directory,
}), { getFolderData: actions.getFolderData })(Data);
