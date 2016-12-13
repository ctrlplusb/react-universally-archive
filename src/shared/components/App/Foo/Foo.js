import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function Foo({ data }) {
  const { applicationName } = data;
  return <div>{applicationName}</div>;
}

export default graphql(gql`query AppNameQuery { applicationName }`)(Foo);
