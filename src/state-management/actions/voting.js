import Woden from 'woden';
import { message } from 'antd';
import { getTokenForHeader } from '../../utils/functions';
import { CREATE_VOTING } from '../types';

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
  console.log(body)
  api.createVoting(body,
    (error, data, response) => {
      message.destroy();
      if (error) {
        message.error(response.body.message);
      } else {
        message.success('Voting successfully created');
        const votingsData = response.body.response;
        console.log(votingsData);
        dispatch({type:CREATE_VOTING})
      }
    });
};

