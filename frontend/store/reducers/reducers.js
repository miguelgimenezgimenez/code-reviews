import { combineReducers } from 'redux';

const intitalStateListings = [];

const listings = (state = intitalStateListings, action) => {
  switch (action.type) {
    case 'UPDATE_LISTINGS_STATE':
      const updatedState = [
        ...state, ...action.listings
      ];
      return updatedState;
    default:
      return state;
  }
};

const userAuthInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AUTH_STATE':
      const updatedState = {
        ...action.info
      };
      return updatedState;
    default:
      return state;
  }
}



const reducers = combineReducers({
  listings,
  userAuthInfo
});

export default reducers;