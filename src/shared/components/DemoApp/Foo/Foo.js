import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function Foo({ data }) {
  const { applicationName } = data;
  return <div>{applicationName}</div>;
}

Foo.propTypes = {
  data: PropTypes.shape({
    applicationName: PropTypes.string.isRequired,
  }).isRequired,
};

export default graphql(gql`query AppNameQuery { applicationName }`)(Foo);
