export const updateListingsState = listings => ({
  type: 'UPDATE_LISTINGS_STATE',
  listings: listings
});

export const setAuthState = authInfo => ({
  type: 'SET_AUTH_STATE',
  info: authInfo
})