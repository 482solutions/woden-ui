import React, { useState } from 'react';
import { Modal, Row, Button } from 'antd';
import { VotingModalSuccess } from '../VotingModalSuccess/index.js';

import './style.css';

export function VotingModal(vote, useVote, useBtn) {
  const {
    variants, votingName, voters, versionTime, votingHash,
  } = vote;
  const [voted, setVoted] = useVote;
  const [btnText, setBtnText] = useBtn;

  const handleClick = (e) => {
    e.preventDefault();
    setBtnText((`Vote For:${e.target.value}`).toUpperCase());
  };

  const modal = Modal.info();

  return (
  // !voted ? (
    modal.update({
      centered: true,
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
                  {variants.map((variant) => <Row className="button-row" key={variant.index}><Button className="voting-button" key={variant.index} onClick={(e) => handleClick(e)}>{variant}</Button></Row>)}
              <Row>
                  <Button className='voting-submit-button' onClick={() => setVoted(!voted)}>{btnText}</Button>
              </Row>
            </div>),
    })
  // )
  // : (
  //   VotingModalSuccess('Congratulations!', 'Your vote is in')
  );
}
