import React from 'react';
import { Modal, Progress, Row } from 'antd';

import fileIcon from '../../../assets/images/votingFileLabel.svg';
import closeIcon from '../../../assets/images/Icon-3.svg';

import './style.css';

export function VotingResults(vote) {
  const {
    variants, votingName, voters, versionTime, description,
  } = vote;

  const colors = ['#6FCF97', '#56CCF2', '#3B7CFF', '#FB8832', '#BA33FA'];

  const totalVoted = () => voters.reduce((acc, tag) => (tag.vote ? acc + 1 : acc), 0);

  const votingResultsForEach = [];

  variants.forEach((v) => {
    const obj = { key: v, value: 0 };
    votingResultsForEach.push(obj);
  });

  for (let i = 0; i < voters.length; i++) {
    for (let j = 0; j < variants.length; j++) {
      const k = votingResultsForEach[j].key;
      const val = votingResultsForEach[j].value;
      if (voters[i].vote === k) {
        votingResultsForEach[j].value = val + 1;
      }
    }
  }

  const countPercent = (index) => {
    if (votingResultsForEach[index].value !== 0) {
      const result = (votingResultsForEach[index].value / totalVoted()) * 100;
      return result % 1 !== 0 ? result.toFixed(2) : result;
    }
    return 0;
  };

  const modal = Modal.info();
  modal.update({
    width: '512px',
    centered: true,
    okButtonProps: { disabled: true, className: "modal-footer-hiden-button" },
    okText: '',
    icon: (<img className={'result-icon'} src={fileIcon} alt="file" title="file"/>),
    content: (<div className={'modal-size modal-voting-results'}>
      <p className="close-icon modal-close-icon" onClick={() => {
        modal.destroy()
      }}><img src={closeIcon} title={'close'} alt={'close'}/></p>
      {/*<Modal footer={null} />*/}
      <Row className="file-row-info">
        <div className="file-info-container">
          <div>
            <h4 className={'voting-results-title'}>{votingName}</h4>
            <p>{versionTime}</p>
            <p style={{ width: '300px' }} className={'voting-file-date'}>{description}</p>
          </div>
        </div>
        <div>
          <p className="voting-results">Signing results</p>
          <p className="voting-results-number">{totalVoted()} / {voters.length}</p>
        </div>
      </Row>
      {
        variants.map((variant, index) => (
          <Row key={index}>
            <div className="result-option">
              <p className="result-option-text-container">
                <span className="result-option-variant">{variant}</span>
                <span className="result-option-percentage">{countPercent(index)}%</span>
              </p>
              <Progress percent={countPercent(index)} strokeColor={colors[index]}
                        strokeWidth={'4px'} showInfo={false}/>
            </div>
          </Row>
        ))
      }
    </div>),
  });
}
