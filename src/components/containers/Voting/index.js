import React, { Component } from 'react';

import { Table } from 'antd';
import { connect } from 'react-redux';
import { actions } from '../../../state-management';
import { Home } from '../../../pages/Home';
import activeVoting from '../../../assets/images/activeVoting.svg';
import closedVoting from '../../../assets/images/closedVoting.svg';
import resultButton from '../../../assets/images/Actions.svg';

const { Column } = Table;

export class Voting extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getVoting()
  }
  prepareData(){
    console.log(this.props.voting.data)
  }

  render() {
    return (
      <>
        <Table tableLayout={"auto"} dataSource={this.props.voting.data}>
          <Column className={"table-text"} title="Name" dataIndex="votingName" key="votingName"/>
          <Column className={"table-text"} title="Version" dataIndex="versionTime"
                  key="versionTime"/>
          <Column className={"table-text"}
                  title="Status"
                  dataIndex="status"
                  key="status"
                  render={(status) => (
                    status ? <img src={activeVoting}/> : <img src={closedVoting}/>
                  )}
          />
          <Column className={"table-text"} title="Due Date" dataIndex="dueDate" key="dueDate"/>
          <Column className={"table-text"}
                  title="Actions"
                  dataIndex="status"
                  key="status"
                  render={(status) => (
                    status ? <Button className='button-style-vote' onClick={() => {
                      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    }}>Vote</Button> : <Button className='button-style-result' onClick={() => {
                      console.log("+++++++++++++++++++++++++++++++++++++++++++++")
                    }}>Results</Button>)}
          />
          <Column className={"table-text"}
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
