/* @flow */

import React from 'react';
import { css } from 'glamor';
import Helmet from 'react-helmet';

const aboutStyles = css`
  text-align: center;
`;

function About() {
  return (
    <div className={aboutStyles}>
      <Helmet title="About" />

      Produced with ❤️
      by
      &nbsp;
      <a href="https://twitter.com/controlplusb" target="_blank" rel="noopener noreferrer">
        Sean Matheson
      </a>
    </div>
  );
}

export default About;
