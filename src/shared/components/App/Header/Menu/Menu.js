/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { css } from 'glamor';

const menuStyles = css`
  padding: 10px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #EBEDEF;
`;

function Menu() {
  return (
    <ul className={menuStyles}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  );
}

export default Menu;
