import React, { useState } from 'react';
import {
  Button, Modal, Row,
} from 'antd';

import './style.css';

export const VotingModal = ({
                              openModal,setOpenModal,  record,  updateVoting,
}) => {
  const {
    variants, votingName, versionTime, votingHash, description,
  } = record;

  const initialBtnText = 'Submit Your Vote'.toUpperCase();

  const [vote, setVote] = useState(null);
  const [btnText, setBtnText] = useState(initialBtnText);
  const [disableBtn, setDisableBtn] = useState(true);

  const handleClick = (variant) => {
    setBtnText((`${variant}`).toUpperCase());
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
      footer={null}
      >
      <div className={'modal-size'} style={{ width: 'auto', height: 'auto' }}>
        <Row>
          <h3 className={'voting-title'}>Voting</h3>
        </Row>
        <Row>
          <div className={'voting-file-container'} style={{ width: '300px' }}>
            <h4 className={'voting-file-name'}>{votingName || 0}</h4>
            <p className={'voting-file-date'}>{versionTime || 0}</p>
            <p style={{ width: '300px' }} className={'voting-file-date'}>{description || ''}</p>
          </div>
        </Row>
        {variants
          ? variants.map((variant, index) => <Row className="button-row" key={index}><Button
          className="voting-button" key={index}
          onClick={() => {
            setDisableBtn(false);
            handleClick(variant);
          }}>{variant}</Button></Row>)
          : ''}
        <Row justify='center'>
          <Button disabled={disableBtn} className='voting-submit-button'
                  onClick={() => onFinish()}><span>Vote For: </span>{ btnText} </Button>
        </Row>
      </div>
    </Modal>
  );
};
