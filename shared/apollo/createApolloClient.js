import { ApolloClient } from "react-apollo";

// The ApolloClient takes its options as well as a network interface.
function createApolloClient({ clientOptions = {}, networkInterface }) {
  if (!networkInterface) {
    throw Error("Please pass a network interface to be used on apollo client");
  }
  const options = Object.assign(
    {},
    {
      addTypeName: true,
      // DataIdFromObject is used by Apollo to identify unique entities from
      // your queries.
      dataIdFromObject: result =>
        // you might see o => o.id commonly with Apollo.
        // If the IDs are only unique per type (this is typical if an ID is just an
        // ID out of a database table), you can use the `__typename` field to scope it.
        // This is a GraphQL field that's automatically available, but you do need
        // to query for it also. @SEE: http://dev.apollodata.com/angular2/cache-updates.html#dataIdFromObject
        // eslint-disable-next-line no-underscore-dangle
        result.id && result.__typename
          ? `${result.__typename}${result.id}`
          : null
    },
    clientOptions
  );

  return new ApolloClient({
    networkInterface,
    ...options
  });
}

export default createApolloClient;
