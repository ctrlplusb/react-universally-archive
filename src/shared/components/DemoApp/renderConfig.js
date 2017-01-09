import React, { PropTypes } from 'react';
import { createRender } from 'found';
import App from './DemoApp';
import Error404 from './Error404';

function RenderError({ error }) {
  return (
    <App>
      {error.status === 404 ? <Error404 /> : 'Error'}
    </App>
  );
}
RenderError.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.number.isRequired,
  }).isRequired,
};

// This function allows us to
// createRender({ renderPending, readyReady, renderError })
export default createRender({
  renderError: RenderError,
});
