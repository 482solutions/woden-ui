import React, { useEffect, useState } from 'react';

import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import { actions } from '../../../state-management';
import { VotingModal } from '../VotingModal';
import { VotingResults } from '../VotingResults';

import activeVoting from '../../../assets/images/activeVoting.svg';
import closedVoting from '../../../assets/images/closedVoting.svg';

const { Column } = Table;

function summVotes(tags) {
  let voted = 0;
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].vote !== null) {
      voted++;
    }
  }
  return `${voted}/${tags.length}`;
}

export const Voting = (props) => {
  const [voted, setVoted] = React.useState(false)
  const [btnText, setBtnText] = React.useState('Submit Your Vote'.toUpperCase())
  const [vote, setVote] = useState('')
  useEffect(() => {
    props.getVoting();
  }, []);

  const newData = [];
  for (let i = 0; i < props.voting.data.length; i++) {
    const item = props.voting.data[i];
    item.index = i + 1;
    newData.push(item);
  }

  const handleClick = (option, record) => {
    // setVotingModal(record)
    console.log(option === 'modal' ? VotingModal(record,[vote,  setVote], [voted, setVoted], [btnText, setBtnText], props.updateVoting) : VotingResults(record));
  };

  return (
      <div className='votingContainer'>
        <Table tableLayout={'auto'} dataSource={newData}>
          <Column className={'table-text'} title="#"
                  dataIndex="index" key="index"/>
          <Column className={'table-text'} title="Name" dataIndex="votingName" key="votingName"/>
          <Column className={'table-text'} title="Version" dataIndex="versionTime"
                  key="versionTime"/>
          <Column className={'table-text'}
                  title="Status"
                  dataIndex="status"
                  key="status"
                  render={(status) => (
                    status ? <img src={activeVoting}/> : <img src={closedVoting}/>
                  )}
          />
          <Column className={'table-text'} title="Due Date" dataIndex="dueDate" key="dueDate"/>
          <Column className={'table-text'}
                  title="Actions"
                  dataIndex="status"
                  key="status"
                  render={(text, record) => (
                    record.status
                      ? <Button className='button-style-vote' onClick={() => {
                        handleClick('modal', record);
                      }}>Vote</Button>
                      : <Button className='button-style-result' onClick={() => {
                        handleClick('result', record);
                      }}>Results</Button>
                  )}
          />
          <Column className={'table-text'}
                  title="Total votes"
                  dataIndex="voters"
                  key="voters"
                  render={(tags) => (
                    summVotes(tags)
                  )}
          />
        </Table>
        {/*{votingModal && <VotingModal {...votingModal}/>}*/}
      </div>
  );
};

export default connect(({ voting }) => ({
  voting,
}),
{
  getVoting: actions.getVotingData,
  updateVoting: actions.vote
})(
  Voting,
);
