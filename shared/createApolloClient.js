/* eslint-disable no-underscore-dangle */
import ApolloClient from 'apollo-client';

const createApolloClient = (networkInterface) => {
  const params = {
    dataIdFromObject: o => o.id,
    networkInterface,
  };
  if (typeof window !== 'undefined') {
    if (window.__APOLLO_STATE__) {
      params.initialState = window.__APOLLO_STATE__;
    }
    params.ssrForceFetchDelay = 200;
  } else {
    params.ssrMode = true;
  }

  return new ApolloClient(params);
};

export default createApolloClient;
