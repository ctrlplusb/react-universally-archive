import { combineReducers } from 'redux';
import posts, * as FromPosts from './posts';

// -----------------------------------------------------------------------------
// EXPORTED SELECTORS

export function getPostById(state, id) {
  return FromPosts.getById(state.posts, id);
}

// -----------------------------------------------------------------------------
// REDUCER EXPORT

export default function getReducers(apolloClient) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    posts,
  });
}
