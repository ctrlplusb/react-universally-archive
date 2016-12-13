import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = [`
type Query {
  applicationName: String
}

schema {
  query: Query
}`];

const resolvers = {
  Query: {
    applicationName() {
      return 'react-universally';
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
