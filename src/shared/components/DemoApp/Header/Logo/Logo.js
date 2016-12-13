/* @flow */

import React from 'react';
import { css } from 'glamor';
import logo from './logo.png';

const logoStyles = css`
  width: 100px;
`;

function Logo() {
  return (
    <img src={logo} alt="Logo" className={logoStyles} />
  );
}

export default Logo;
