/* @flow */

import React from 'react';
import { css } from 'glamor';
import Logo from './Logo';
import Menu from './Menu';

const headerStyles = css`
  text-align: center;
  margin-bottom: 1rem;
  background-color: #FBEEE6;
`;

function Header() {
  return (
    <div className={headerStyles}>
      <Logo />
      <h1>React, Universally</h1>
      <strong>
        A starter kit giving you the minimum requirements for a modern universal react application.
      </strong>
      <Menu />
    </div>
  );
}

export default Header;
