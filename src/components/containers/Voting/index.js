import React, { Component } from 'react';

import { Table } from 'antd';
import { connect } from 'react-redux';
import { actions } from '../../../state-management';
import { Home } from '../../../pages/Home';

const { Column } = Table;

export class Voting extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getVoting()
  }

  render() {
    const data = [
      {
        votingName: "Test",
        versionTime: 1576859403,
        status: true,
        dueDate: 1576859403,
        voters: 2
      }
    ]
    return (
      <>
        <Table dataSource={this.props.voting.data}>
          <Column title="Name" dataIndex="votingName" key="votingName"/>
          <Column title="Version" dataIndex="versionTime" key="versionTime"/>
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status) => (
              status ? 'Active':'Closed'
            )}
          />
          <Column title="Due Date" dataIndex="dueDate" key="dueDate"/>
          <Column
            title="Actions"
            dataIndex="status"
            key="status"
            render={(status) => (
              status ? 'Vote':'Results'
            )}
          />
          <Column
            title="Total votes"
            dataIndex="voters"
            key="voters"
            render={tags => (
              <>
                0/3
              </>
            )}
          />

        </Table>
      </>
    );
  }
}
export default connect(({ voting }) => ({
    voting: voting
  }),
  {
    getVoting: actions.getVotingData,
  })(
  Voting,
);