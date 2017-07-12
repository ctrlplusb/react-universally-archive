import { combineReducers } from 'redux';

// -----------------------------------------------------------------------------
// REDUCER EXPORT

export default function getReducers(apolloClient) {
  return combineReducers({
    apollo: apolloClient.reducer(),
  });
}
