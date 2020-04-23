import React from 'react';
import {Modal} from "antd";
import { connect } from 'react-redux';

import {schemes} from "../../../utils";
import {CreateForm} from "../../presentations";
import {actions} from "../../../state-management";

class ChangePermissions extends React.Component {
  state = {
    isModalOpen: false,
  };

  setModalVisibility = (isModalOpen) => {
    this.setState({
      isModalOpen
    })
  };

  changePermissions = ({ type, name }) => {
    this.props.editPermission(this.props.path.split('/').slice(1).join('/'), { type, user: name });
    this.setModalVisibility(false);
  };

  render() {
    return (
      <>
        <div>Permissions</div>
        <div
          className="permissions-title__link"
          onClick={() => this.setModalVisibility(true)}
        >
          share
        </div>
        <Modal
          title={`Share ${this.props.path.split('/').pop().toUpperCase()} with a team`}
          visible={this.state.isModalOpen}
          centered
          footer={null}
          onCancel={() => this.setModalVisibility(false)}
        >
          <CreateForm
            layout="horizontal"
            onSubmit={this.changePermissions}
            scheme={schemes.changePermissions()}
            buttonName="Share"
            className="flex-direction-column flex-center"
          />
        </Modal>
      </>
    )
  }
}

export default connect(null, { editPermission: actions.editPermission })(ChangePermissions);