const initialState = {
  auth: false
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'LOG_IN':
      newState.auth = action.auth;
      break;
    case 'LOG_OUT':
      newState.auth = false;
      break;
    case 'SET_TOKEN':
      newState.auth.firebaseToken = action.token;
      break;
    case 'REMOVE_TOKEN':
      newState.auth.firebaseToken = '';
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
