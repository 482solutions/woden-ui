import React, { useState } from 'react';
import { Modal, Row, Progress } from 'antd';

import fileIcon from '../../../assets/images/fileImages/fileImage.svg'

export function VotingResults(variants, votingName, voters, versionTime){
    const colors = ['#6FCF97', '#56CCF2', '#3B7CFF', '#FB8832', '#BA33FA'];
    
    const countPercent = (votedCount) => {
        return voters.length / totalVoters * 100;
    } 
    
    
    <Modal 
          centered={true}
          >
          <div className={"modal-size"}>
            <Row className="file-row-info">
                <div className="file-info-container">
                    <img src={fileIcon} /> 
                    <div>
                        <h4 className={"voting-success-message"}>{votingName}</h4>
                        <p>{versionTime}</p>
                    </div>
                </div>
                <div>
                    <p>Voting results</p>
                    <p>{voters.reduce((acc, tag, index) => (tag.vote ? acc + 1 : acc), 0)} / {voters.length}</p>
                </div>
            </Row>
            <Row>
                {variants.forEach((variant, index) => {    
                    <div className="result-option">
                        <p className="result-option-text-container">
                            <span className="result-option-variant">{variant}</span>
                            {/* <span className="result-option-percentage">{}</span> */}
                        </p>
                        <Progress percent={30} strokeColor={colors[index]} strokeWidth={'4px'}/>
                    </div>
                 })
                }
            </Row>
          </div>
          </Modal>
    }    
