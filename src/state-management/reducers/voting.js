import {
  GET_VOTING_DATA,
  SET_VOTING_DATA,
  UPDATE_VOTING_DATA,
} from '../types';

const initialState = {
  data: [],
};
const cleanStorage = () => initialState;

const handleSetVoting = (state, votingData) => ({
  data: [...votingData],
});

const handleGetVoting = (state, votingData) => ({
  data: [...votingData],
});

const handleUpdateVoting = (state, voteData) => {
  const dataIndex = state.data.findIndex((element, index) => {
    if (element.votingHash === voteData.votingHash) {
      return index;
    }
    return false;
  });
  const newData = state.data;
  newData[dataIndex] = voteData;
  return {
    ...state,
    data: newData,
  };
};

const handlers = {
  [SET_VOTING_DATA]: handleSetVoting,
  [UPDATE_VOTING_DATA]: handleUpdateVoting,
  [GET_VOTING_DATA]: handleGetVoting,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
