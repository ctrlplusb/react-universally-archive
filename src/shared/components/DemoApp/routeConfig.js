import React, { PropTypes } from 'react';
import { makeRouteConfig, Route } from 'found/lib/jsx';
import { CodeSplit } from 'code-split-component';
import App from './DemoApp';

function RouteRender({ Component, props }) {
  if (!Component || !props) {
    return <div><small>Loading&hellip;</small></div>;
  }

  return <Component {...props} />;
}
RouteRender.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  props: PropTypes.object.isRequired,
};

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
      render={RouteRender}
    />
    <Route
      path="about"
      Component={CodeSplitAbout}
      render={RouteRender}
    />
  </Route>,
);
