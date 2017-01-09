
import React from 'react';
import { renderToString } from 'react-dom/server';
import { getFarceResult } from 'found/lib/server';
import { CodeSplitProvider, createRenderContext } from 'code-split-component';
import Helmet from 'react-helmet';
import generateHTML from './generateHTML';
import { routeConfig, renderConfig } from '../../../shared/components/DemoApp';
import config from '../../../../config';

/**
 * An express middleware that is capabable of service our React application,
 * supporting server side rendering of the application.
 */
async function reactApplicationMiddleware(request, response) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config.disableSSR) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('==> Handling react route without SSR');
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

  const { redirect, status, element } = await getFarceResult({
    url: request.url,
    routeConfig,
    render: renderConfig,
  });

  if (redirect) {
    response.redirect(302, redirect.url);
    return;
  }

  // We also create a context for our <CodeSplitProvider> which will allow us
  // to query which chunks/modules were used during the render process.
  const codeSplitContext = createRenderContext();

  // Create our React application and render it into a string.
  const reactAppString = renderToString(
    <CodeSplitProvider context={codeSplitContext}>
      {element}
    </CodeSplitProvider>,
  );

  // Generate the html response.
  const html = generateHTML({
    // Provide the full app react element.
    reactAppString,
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
  });

  response
    .status(status)
    .send(html);
}

// Create an async wrapper to catch exceptions thrown by our middleware
const asyncErrorHandlerWrapper = fn => (...args) => fn(...args).catch(args[2]);

export default asyncErrorHandlerWrapper(reactApplicationMiddleware);
