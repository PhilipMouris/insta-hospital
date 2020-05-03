export const logIn = auth => ({
  type: 'LOG_IN',
  auth
});

export const logOut = () => ({
  type: 'LOG_OUT'
});

export const setFireBaseToken = token => ({
  type: 'SET_TOKEN',
  token
});

export const removeFireBaseToken = token => ({
  type: 'REMOVE_TOKEN',
  token
});
