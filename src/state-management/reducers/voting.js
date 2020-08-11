import {
  GET_VOTING_DATA,
  SET_VOTING_DATA,
} from '../types';

const initialState = {
 data: []
};
const cleanStorage = () => initialState;

const handleSetVoting = (state, votingData) => ({
  data: [...votingData]
});

const handleGetVoting = (state, votingData) => ({
  data: [...votingData]
});

const handlers = {
  [SET_VOTING_DATA]: handleSetVoting,
  [GET_VOTING_DATA]: handleGetVoting,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
