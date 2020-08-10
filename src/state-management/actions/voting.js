import Woden from 'woden';
import { message } from 'antd';
import { getTokenForHeader } from '../../utils/functions';
import { CLEAN_STORAGE, CREATE_VOTING, LOGOUT, SET_VOTING_DATA, UPDATE_VOTING_DATA } from '../types';
import '../../components/containers/Voting/style.css';
import React from 'react';
import { VotingModalSuccess } from '../../components/containers/VotingModalSuccess';

const api = new Woden.VotingApi();
const defaultClient = Woden.ApiClient.instance;
const { Bearer } = defaultClient.authentications;


export const createVoting = (votingData) => async (dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  message.loading('Creating vote...', 0);
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
        VotingModalSuccess('Done!', 'The voting becomes available')
        dispatch({ type: CREATE_VOTING })
      }
    });
};


export const getVotingData = () => async (dispatch) => {
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
        for(let i = 0; i < response.body.response.length; i++){
          response.body.response[i].versionTime = new Date(response.body.response[i].versionTime * 1000).toLocaleString(
            'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour: 'numeric',
              hour12: false,
              minute: '2-digit',
            })
          response.body.response[i].dueDate = new Date(response.body.response[i].dueDate * 1000).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            hour12: false,
            minute: '2-digit',
          })
        }

        const votingData = response.body;
        dispatch({
          type: SET_VOTING_DATA,
          payload: response.body.response
        });
      }
    },
  );
};


export const vote = (voteData) => async (dispatch) => {
  Bearer.apiKey = await getTokenForHeader();
  message.loading('Vote...', 0);
  const body = new Woden.Vote();
  body.hash = voteData.votingHash;
  body.variant = voteData.variant;
  console.log(body)
  api.updateVoting(body,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        VotingModalSuccess('Congratulations!!', 'Your vote are in')
        dispatch({ type: UPDATE_VOTING_DATA })
      }
    });
};