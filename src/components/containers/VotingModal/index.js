import React from 'react';
import { Button, Modal, Row } from 'antd';

import './style.css';

export function VotingModal(voting, decide, useVote, useBtn, updateVoting) {
  const {
    variants, votingName, voters, versionTime, votingHash,
  } = voting;
  const [voted, setVoted] = useVote;
  const [vote, setVote] = decide;
  const [btnText, setBtnText] = useBtn;


  const handleClick = (variant) => {
    console.log(variant)
    setBtnText((`Vote For:${variant}`).toUpperCase());
    setVote(variant)
    console.log(vote)
  };
  const onFinish = async () => {
    const data = {
      votingHash,
      variant: vote,
    }
    updateVoting(data)
  };
  const modal = Modal.info();

  return (
    // !voted ? (
    modal.update({
      centered: true,
      icon: (<></>),
      content: (<div className={'modal-size'}>
        <Row>
          <h3 className={'voting-title'}>Voting</h3>
        </Row>
        <Row>
          <div className={'voting-file-container'}>
            <h4 className={'voting-file-name'}>{votingName}</h4>
            <p className={'voting-file-date'}>{versionTime}</p>
          </div>
        </Row>
        {variants.map((variant) => <Row className="button-row" key={variant.index}><Button
          className="voting-button" key={variant.index}
          onClick={() => handleClick(variant)}>{variant}</Button></Row>)}
        <Row>
          <Button className='voting-submit-button'
                  onClick={() => onFinish()}>{btnText}</Button>
        </Row>
      </div>),
    })
    // )
    // : (
    //   VotingModalSuccess('Congratulations!', 'Your vote is in')
  );
}
