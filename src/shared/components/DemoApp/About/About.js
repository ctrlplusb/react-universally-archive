/* @flow */

import React from 'react';
import Helmet from 'react-helmet';
import Centered from '../../lib/layout/Centered';

function About() {
  return (
    <Centered>
      <Helmet title="About" />

      Produced with ❤️
      by
      &nbsp;
      <a href="https://twitter.com/controlplusb" target="_blank" rel="noopener noreferrer">
        Sean Matheson
      </a>
    </Centered>
  );
}

export default About;
