/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import { rehydrate } from 'glamor';
import { CodeSplitProvider, rehydrateState } from 'code-split-component';
import ReactHotLoader from './components/ReactHotLoader';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

function renderApp() {
  // We rehydrate the server-side rendered CSS hashes here, so the client-side
  // does not re-injected them. To do so, it has to run before any code that defines
  // any styles, which is why we require the App's main component after this has run
  // instead of importing it at the top of the file.
  rehydrate(window._glam); // eslint-disable-line no-underscore-dangle
  const App = require('../shared/components/App').default;

  // We use the code-split-component library to provide us with code splitting
  // within our application. This library supports server rendered applications,
  // but for server rendered applications it requires that we rehydrate any
  // code split modules that may have been rendered for a request.  We use
  // the provided helper and then pass the result to the CodeSplitProvider
  // instance which takes care of the rest for us.  This is really important
  // to do as it will ensure that our React checksum for the client will match
  // the content returned by the server.
  // @see https://github.com/ctrlplusb/code-split-component
  rehydrateState().then(codeSplitState =>
    render(
      <ReactHotLoader>
        <CodeSplitProvider state={codeSplitState}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CodeSplitProvider>
      </ReactHotLoader>,
      container,
    ),
  );
}

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    '../shared/components/App',
    () => renderApp(require('../shared/components/App').default),
  );
}

// Execute the first render of our app.
renderApp();

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');
