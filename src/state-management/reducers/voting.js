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
  const newData = state.data.map(i => {
    if (i.votingHash === voteData.votingHash) {
      return voteData;
    }
    return i;
  });
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
