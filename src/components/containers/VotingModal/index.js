import React, { useState } from 'react';
import { Modal, Row, Button } from 'antd';
import { VotingModalSuccess } from '../VotingModalSuccess/index.js';

export function VotingModal(vote) {
  const {
    variants, votingName, voters, versionTime, votingHash,
  } = vote;
  const [voted, setVoted] = useState(false);
  const [btnText, setBtnText] = useState('Submit Your Vote'.toUpperCase());

  const handleClick = (e) => {
    e.preventDefault();
    setBtnText((`Vote For:${e.target.value}`).toUpperCase());
  };

  const modal = Modal.info();

  return !voted ? (
    modal.update({
      centered: true,
      okText: { btnText },
      content: (<div className={'modal-size'}>
              <Row>
                <h3 className={'voting-success-title'}>Voting</h3>
              </Row>
              <Row>
                <h4 className={'voting-success-message'}>{votingName}</h4>
                <p>{versionTime}</p>
              </Row>
              <Row>
                  {variants.map((variant) => <Button key={variant.index} onClick={(e) => handleClick(e)}>{variant}</Button>)}
              </Row>
              <Row>
                  <Button onClick={() => setVoted(!voted)} />
              </Row>
            </div>),
    })
  ) : (
    VotingModalSuccess('Congratulations!', 'Your vote is in')
  );
}
