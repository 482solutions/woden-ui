import React, { useState } from 'react';
import {
  Button, Modal, Row,
} from 'antd';

import './style.css';

export const VotingModal = ({
  record, updateVoting, setOpenModal, openModal,
}) => {
  const {
    variants, votingName, versionTime, votingHash, description,
  } = record;

  const initialBtnText = 'Submit Your Vote'.toUpperCase();

  const [vote, setVote] = useState(null);
  const [btnText, setBtnText] = useState(initialBtnText);

  const handleClick = (variant) => {
    setBtnText((`Vote For: ${variant}`).toUpperCase());
    setVote(variant);
  };

  const onFinish = async() => {
    const data = {
      votingHash,
      variant: vote,
    };
    updateVoting(data);
    setBtnText(initialBtnText);
    setOpenModal(false);
  };

  return (
    <Modal
      visible={openModal}
      width={'380px'}
      centered={true}
      closeIcon={<p className="close-icon" onClick={() => {
        setOpenModal(false);
        setBtnText(initialBtnText);
      }}>X</p>}
      footer={[
        <div style={{ marginTop: '20px' }}></div>,
      ]}
      >
      <div className={'modal-size'} style={{ height: 'auto' }}>
        <Row>
          <h3 className={'voting-title'}>Voting</h3>
        </Row>
        <Row>
          <div className={'voting-file-container'}>
            <h4 className={'voting-file-name'}>{votingName || 0}</h4>
            <p className={'voting-file-date'}>{versionTime || 0}</p>
            <p style={{ width: '200px' }} className={'voting-file-date'}>{description || ''}</p>
          </div>
        </Row>
        {variants
          ? variants.map((variant) => <Row className="button-row" key={variant.index}><Button
          className="voting-button" key={variant.index}
          onClick={() => handleClick(variant)}>{variant}</Button></Row>)
          : ''}
        <Row>
          <Button className='voting-submit-button' onClick={() => onFinish()}>{btnText} </Button>
        </Row>
      </div>
    </Modal>
  );
};
