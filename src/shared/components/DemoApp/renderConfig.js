/* flow */

import React from 'react';
import { createRender } from 'found';
import App from './DemoApp';
import Error404 from './Error404';

// This function allows us to
// createRender({ renderPending, readyReady, renderError })
export default createRender({
  renderError: ({ error }) => ( // eslint-disable-line react/prop-types
    <App>
      {error.status === 404 ? <Error404 /> : 'Error'}
    </App>
  ),
});
