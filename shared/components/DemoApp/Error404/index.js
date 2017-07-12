import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Error404 extends Component {
  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.missed = true;
    }
  }

  render() {
    return <div>Sorry, that page was not found.</div>;
  }
}

Error404.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.any),
};

Error404.defaultProps = {
  staticContext: {},
};

export default Error404;
