/* @flow */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducers from '../reducers';

function configureStore(apolloClient : Object, initialState? : Object) {
  const enhancers = compose(
    // Middleware store enhancer.
    applyMiddleware(
      apolloClient.middleware(),
    ),
    // Redux Dev Tools store enhancer.
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    // We only want this enhancer enabled for development and when in a browser
    // with the extension installed.
    process.env.NODE_ENV === 'development'
      && typeof window !== 'undefined'
      && typeof window.devToolsExtension !== 'undefined'
      // Call the brower extension function to create the enhancer.
      ? window.devToolsExtension()
      // Else we return a no-op function.
      : f => f,
  );

  const store = createStore(
    combineReducers(
      Object.assign(
        {},
        // The application reducers.
        reducers,
        // The system reducers.
        { apollo: apolloClient.reducer() },
      ),
    ),
    initialState,
    enhancers,
  );

  if (process.env.NODE_ENV === 'development' && module.hot) {
    // Enable Webpack hot module replacement for reducers. This is so that we
    // don't lose all of our current application state during hot reloading.
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
