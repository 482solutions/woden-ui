
const initialState = {

};



const handlers = {
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
