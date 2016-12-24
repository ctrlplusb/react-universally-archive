/* @flow */

import React from 'react';
import { makeRouteConfig, Route } from 'found/lib/jsx';
import { CodeSplit } from 'code-split-component';
import type { ReactElement } from '../../types/react';
import App from './DemoApp';

function routeRender({ Component, props }: {Component: ReactElement, props?: any}) {
  if (!Component || !props) {
    return <div><small>Loading&hellip;</small></div>;
  }

  return <Component {...props} />;
}

function CodeSplitHome() {
  return (
    <CodeSplit chunkName="home" modules={{ Home: require('./Home') }}>
      { ({ Home }) => Home && <Home /> }
    </CodeSplit>
  );
}

function CodeSplitAbout() {
  return (
    <CodeSplit chunkName="about" modules={{ About: require('./About') }}>
      { ({ About }) => About && <About /> }
    </CodeSplit>
  );
}

export default makeRouteConfig(
  <Route
    path="/"
    Component={App}
  >
    <Route
      Component={CodeSplitHome}
      render={routeRender}
    />
    <Route
      path="about"
      Component={CodeSplitAbout}
      render={routeRender}
    />
  </Route>,
);
