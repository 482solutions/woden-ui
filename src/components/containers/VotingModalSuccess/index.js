import React from 'react';
import { Row, Modal } from 'antd';
import votingLabel from '../../../assets/images/successVoting.svg'

export function VotingModalSuccess(title, message){
    const modal = Modal.success();
            modal.update({
            centered: true,
            okText: 'Continue'.toUpperCase(),
            icon: (<img className={"voting-success-image"} src={votingLabel} alt='add' title='add'/>),
            content: (<div className={"modal-size"}>
                <Row>
                    <h3 className={"voting-success-title"}>{title}</h3>
                </Row>
                <Row>
                    <h4 className={"voting-success-message"}>{message}</h4>
                </Row>
            </div>)
            })
    } 