import React, { useEffect, useState } from 'react';

import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import { actions } from '../../../state-management';
import { VotingModal } from '../VotingModal/index';
import { VotingResults } from '../VotingResults/index';

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
  const [name, setName] = useState(props.userName);
  const [openModal, setOpenModal] = useState(false);
  const [record, setRecord] = useState({});

  const checkIfVoted = (votingData) => {
    let result = true;
    votingData.forEach((voter) => {
      if (voter.name === name && voter.vote === null) {
        result = false;
        return result
      }
    });
    return result;
  };

  useEffect(() => {
    setName(props.userName);
    props.getVoting();
  }, []);

  const newData = [];
  for (let i = 0; i < props.voting.data.length; i++) {
    const item = props.voting.data[i];
    item.index = i + 1;
    newData.push(item);
  }

  const handleClick = (option, inRecord) => {
    if (option === 'modal') {
      setOpenModal(true);
      setRecord(inRecord);
    } else VotingResults(inRecord);
  };

  const cutText = (text) => {
    if (text.length >= 30) {
      const firstPart = text.substring(0, 30);
      const secondPart = text.slice(-3);
      return `${firstPart}...${secondPart}`;
    }
    return text;
  };

  return (
      <div className='votingContainer'>
        <Table rowKey="index" tableLayout={'auto'} dataSource={newData}>
          <Column colSpan="1" width={'50px'} className={'table-text'} title="#"
                  dataIndex="index" key="index"/>
          <Column ellipsis={true} columnWidth={'350px'} className={'table-text'} title="Name" dataIndex="votingName" key="votingName"
                  render={(text, object) => <p style={{ width: '300px' }}>{cutText(object.votingName)}</p>}
                  />
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
                  render={(text, voteObj) => (voteObj.status
                    ? <Button className='button-style-vote' disabled={checkIfVoted(voteObj.voters)} onClick={() => {
                      handleClick('modal', voteObj);
                    }}>Sign</Button>
                    : <Button className='button-style-result' onClick={() => {
                      handleClick('result', voteObj);
                    }}>Results</Button>
                  )
                  }
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
        <VotingModal openModal={openModal} setOpenModal={setOpenModal} record={record} updateVoting={props.updateVoting} />
      </div>
  );
};

export default connect(({ auth, voting }) => ({
  voting,
  userName: auth.user.name,
}),
{
  getVoting: actions.getVotingData,
  updateVoting: actions.vote,
})(
  Voting,
);
