import React, { useState } from 'react';
import { Button, Modal, Row, } from 'antd';
import closeIcon from '../../../assets/images/Icon-3.svg';
import './style.css';

export const VotingModal = ({ openModal,setOpenModal,  record,  updateVoting }) => {
  const { variants, votingName, versionTime, votingHash, description } = record;
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
      }}><img src={closeIcon} title={'close'} alt={'close'}/></p>}
      footer={null}
      >
      <div className={'modal-size'} style={{ width: 'auto', height: 'auto' }}>
        <Row>
          <h3 className={'voting-title'}>Signing</h3>
        </Row>
        <Row>
          <div className={'voting-file-container'}>
            <h4 className={'voting-file-name'}>{votingName || 0}</h4>
            <p className={'voting-file-date'}>{versionTime || 0}</p>
            <p className={'voting-file-date'}>{description || ''}</p>
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
                  onClick={() => onFinish()}><span>Sign: </span>{ btnText} </Button>
        </Row>
      </div>
    </Modal>
  );
};
