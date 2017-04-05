import React, { PropTypes } from 'react';
import { withJob } from 'react-jobs';
import { resolveAfter } from './utils';

function Product({ jobResult }) {
  const { id, name, price } = jobResult;
  return (
    <div>
      [{id}] - Name: {name}, Price: {price}
    </div>
  );
}

Product.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobResult: PropTypes.object.isRequired,
};

export default withJob({
  work: ({ id }) => {
    // This is where you would use something like `fetch` to hit an API.
    if (id === 1) {
      return resolveAfter({ id, name: 'Spade', price: 1337 }, 1000);
    }
    if (id === 2) {
      return resolveAfter({ id, name: 'Bucket', price: 7331 }, 400);
    }
    throw new Error('Some sort of error occurrred');
  },
  LoadingComponent: ({ id }) => <div>Loading product {id}...</div>,
  ErrorComponent: ({ id, error }) => (
    <div style={{ color: 'red' }}>Failed to load product {id} ({error.message})</div>
  ),
})(Product);
