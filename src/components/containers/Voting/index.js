import React, { Component } from 'react';

import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import { actions } from '../../../state-management';
import activeVoting from '../../../assets/images/activeVoting.svg';
import closedVoting from '../../../assets/images/closedVoting.svg';

const { Column } = Table;
let number = 0

function summVotes(tags) {
  let voted = 0
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].vote !== null) {
      voted++
    }
  }
  return `${voted}/${tags.length}`
}

function numerate() {
  // if (number > 9) {
  //   number = 0
  // }
  number++
  return `${number}`
}

export class Voting extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getVoting()
  }

  prepareData() {
  }

  render() {
    const newData =[];
    for(let i = 0; i < this.props.voting.data.length; i++ ) {
      const item = this.props.voting.data[i];
      item.index = i + 1;
      newData.push(item)
    }
    return (
      <div className='votingContainer'>
        <Table tableLayout={"auto"} dataSource={newData}>
          <Column className={"table-text"} title="#"
                  dataIndex="index" key="index"/>
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
                    summVotes(tags)
                  )}
          />
        </Table>
      </div>
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