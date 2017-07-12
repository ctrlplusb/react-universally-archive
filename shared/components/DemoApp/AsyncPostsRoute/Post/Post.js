/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { shape, bool, string, number } from 'prop-types';
import { graphql } from 'react-apollo';
import Helmet from 'react-helmet';
import SINGLE_POST_QUERY from './singlePost.graphql';

class Post extends Component {
  render() {
    const { data: { loading, singlePost } } = this.props;
    if (loading) {
      return <h1>LOADING...</h1>;
    }
    const { title, body, userId } = singlePost;
    return (
      <div>
        <Helmet title={`Posts - ${title}`} />
        <div>
          <h1>
            {title}
          </h1>
          <p>
            {body}
          </p>
          <hr />
          <span>
            By User {userId}
          </span>
        </div>
      </div>
    );
  }
}

export default graphql(SINGLE_POST_QUERY, {
  options: props => ({
    variables: {
      id: props.match.params.id,
    },
  }),
})(Post);

Post.propTypes = {
  data: shape({
    loading: bool.isRequired,
    singlePost: shape({
      title: string,
      body: string,
      userId: number,
    }),
  }).isRequired,
};
