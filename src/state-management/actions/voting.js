import Woden from 'woden';
import { message, Modal } from 'antd';
import { getTokenForHeader } from '../../utils/functions';
import { CLEAN_STORAGE, CREATE_VOTING, LOGOUT, SET_VOTING_DATA } from '../types';
import { updateFolderData } from './filesystem';
import React from 'react';

const api = new Woden.VotingApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;


export const createVoting = (votingData) => async(dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  message.loading('Creating voting...', 0);
  const body = new Woden.Voting();
  body.hash = votingData.fileHash;
  body.dueDate = votingData.dueDate.toString();
  body.variants = votingData.variants;
  body.excludedUsers = votingData.excludedUsers;
  body.description = votingData.description;
  api.createVoting(body,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        const modal = Modal.success();
        modal.update({centered: true, okText:'Continue', content: (<div><h3>Done</h3><h4>The voting becomes available</h4></div>)})
        const votingsData = response.body.response;
        console.log(votingsData);
        dispatch({type:CREATE_VOTING})
      }
    });
};


export const getVotingData = () => async(dispatch) => {
  message.loading('Getting data...', 0);
  Bearer.apiKey = await getTokenForHeader();
  api.getVoting(
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else if (response.status === 203) {
        localStorage.removeItem('token');
        localStorage.removeItem('rootFolder');
        dispatch({
          type: LOGOUT,
        });
        dispatch({
          type: CLEAN_STORAGE,
        });
      } else {
        const votingData = response.body;
        dispatch({
          type: SET_VOTING_DATA,
          payload: response.body.response
        });
        console.log("VOTING DATA:",votingData)
      }
    },
  );
};


