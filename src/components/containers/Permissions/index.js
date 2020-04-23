import React from 'react';
import { connect } from 'react-redux';
import { List, Card } from "antd";

import { models } from '../../../utils';
import {KeyValueList} from "../../presentations";
import './style.css';
import {ChangePermissions} from "../index";

const permissionView = {
  [models.Permissions.Owner]: 'user',
  [models.Permissions.View]: 'eye',
  [models.Permissions.Edit]: 'edit',
};

const ownerPermission = {
  owner: true,
  view: true,
  edit: true,
};
const editPermission = {
  owner: false,
  view: true,
  edit: true,
};
const viewPermission = {
  owner: false,
  view: true,
  edit: false,
};
const noPermission = {
  owner: false,
  view: false,
  edit: false,
};

class Permissions extends React.Component {
  getMyPermissions() {
    const { permissions, auth } = this.props;
    const filePermissions = permissions.info[permissions.isShow];

    if (!filePermissions) return noPermission;

    if (filePermissions.owner === auth.user.name) return ownerPermission;
    if (filePermissions.edit.includes(auth.user.name)) return editPermission;

    return viewPermission;
  }

  getAllPermissions() {
    const { permissions } = this.props;
    const filePermissions = permissions.info[permissions.isShow];

    if (!filePermissions) return {
      owner: "",
      view: [],
      edit: []
    };

    return filePermissions;
  }

  render() {
    const { isShow } = this.props.permissions;
    return(
      <>
        {
          isShow && (
            <Card
              // title={
              //   this.getMyPermissions().owner ?
              //   <ChangePermissions
              //     path={this.props.permissions.isShow}
              //   /> : "Permissions"
              // }
              // extra={
              //   Object.entries(this.getMyPermissions()).map(([type, amIHave]) => (
              //     <Icon
              //       key={type}
              //       type={permissionView[type]}
              //       style={{
              //         color: amIHave ? "" : "#c0c0c0",
              //         fontSize: "16px"
              //       }}
              //     />
              //   ))
              // }
            >
              {
                Object.entries(this.getAllPermissions()).map(([type, permissions]) => {
                  if (type === models.Permissions.Owner) {
                    return (
                      <KeyValueList
                        key={type}
                        list={{
                          owner: permissions
                        }}
                      />
                    )
                  }

                  return (
                    <List
                      key={type}
                      header={<h5 className="list__header">{type}</h5>}
                      bordered
                      size="small"
                      dataSource={permissions}
                      renderItem={item => (
                        <List.Item key={item}>{item}</List.Item>
                      )}
                    />
                  )
                })
              }
            </Card>
          )
        }
      </>
    )
  }
}

export default connect(({ auth, permissions }) => ({ auth, permissions }))(Permissions)
