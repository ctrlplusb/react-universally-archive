import { ApolloClient } from 'react-apollo';

function createApolloClient({ clientOptions = {}, networkInterface }) {
  if (!networkInterface) {
    throw Error('Please pass a network interface to be used on apollo client');
  }
  const options = Object.assign(
    {},
    {
      addTypeName: true,
      dataIdFromObject: result =>
        // eslint-disable-next-line no-underscore-dangle
        result.id && result.__typename ? `${result.__typename}${result.id}` : null,
    },
    clientOptions,
  );

  return new ApolloClient({
    networkInterface,
    ...options,
  });
}

export default createApolloClient;
