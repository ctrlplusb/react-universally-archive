/* @flow */
/* eslint-disable no-console */

import type { $Request, $Response, Middleware } from 'express';
import React from 'react';
import { ServerRouter, createServerRenderContext } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { CodeSplitProvider, createRenderContext } from 'code-split-component';
import Helmet from 'react-helmet';
import generateHTML from './generateHTML';
import configureStore from '../../../shared/redux/configureStore';
import App from '../../../shared/components/App';
import envConfig from '../../../../config/private/environment';

/**
 * An express middleware that is capabable of service our React application,
 * supporting server side rendering of the application.
 */
function reactApplicationMiddleware(request: $Request, response: $Response) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (!envConfig.ssrEnabled) {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> Handling react route without SSR');  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = generateHTML({
      // Nonce which allows us to safely declare inline scripts.
      nonce,
    });
    response.status(200).send(html);
    return;
  }

  // Create our apollo client.
  const apolloClient = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    networkInterface: createNetworkInterface({
      uri: `http://${envConfig.host}:${envConfig.port}/graphql`,
      opts: {
        credentials: 'same-origin',
        // transfer request headers to networkInterface so that they're accessible to proxy server
        // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
        headers: request.headers,
      },
    }),
  });

  // Create the redux store.
  const store = configureStore(apolloClient);

  // First create a context for <ServerRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = createServerRenderContext();

  // We also create a context for our <CodeSplitProvider> which will allow us
  // to query which chunks/modules were used during the render process.
  const codeSplitContext = createRenderContext();

  // Create our React application element.
  const reactAppElement = (
    <CodeSplitProvider context={codeSplitContext}>
      <ServerRouter location={request.url} context={reactRouterContext}>
        <ApolloProvider store={store} client={apolloClient}>
          <App />
        </ApolloProvider>
      </ServerRouter>
    </CodeSplitProvider>
  );

  // Render the react application to a string using the provided Apollo
  // renderToString custom implementation.
  // This is a requirement to ensure that all the Apollo component event
  // hooks get fired and resolved for the current request.
  renderToStringWithData(reactAppElement).then((reactAppString) => {
    // Generate the html response.
    const html = generateHTML({
      // Provide the rendered React application as a string.
      app: reactAppString,
      // Nonce which allows us to safely declare inline scripts.
      nonce,
      // Running this gets all the helmet properties (e.g. headers/scripts/title etc)
      // that need to be included within our html.  It's based on the rendered app.
      // @see https://github.com/nfl/react-helmet
      helmet: Helmet.rewind(),
      // We provide our code split state so that it can be included within the
      // html, and then the client bundle can use this data to know which chunks/
      // modules need to be rehydrated prior to the application being rendered.
      codeSplitState: codeSplitContext.getState(),
      // The initial Apollo/Redux state.
      initialState: apolloClient.store.getState()[apolloClient.reduxRootKey].data,
    });

    // Get the render result from the server render context.
    const renderResult = reactRouterContext.getResult();

    // Check if the render result contains a redirect, if so we need to set
    // the specific status and redirect header and end the response.
    if (renderResult.redirect) {
      response.status(301).setHeader('Location', renderResult.redirect.pathname);
      response.end();
      return;
    }

    response
      .status(
        renderResult.missed
          // If the renderResult contains a "missed" match then we set a 404 code.
          // Our App component will handle the rendering of an Error404 view.
          ? 404
          // Otherwise everything is all good and we send a 200 OK status.
          : 200,
      )
      .send(html);
  }).catch((err) => {
    // TODO: Make this nicer.
    response.status(500).send('Unfortunately a problem occurred.');
    if (err) {
      console.error(err);
    }
  });
}

export default (reactApplicationMiddleware : Middleware);
