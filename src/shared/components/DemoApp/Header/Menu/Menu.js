/* @flow */

import React from 'react';
import { Link } from 'found';

function LinkItem(props) {
  // TODO: Remove the pragma once evcohen/eslint-plugin-jsx-a11y#81 ships.
  return (
    <li>
      <Link // eslint-disable-line jsx-a11y/anchor-has-content
        {...props}
        activeStyle={{ fontWeight: 'bold' }}
      />
    </li>
  );
}

function Menu() {
  return (
    <ul style={{ marginTop: '1rem' }}>
      <LinkItem to="/" exact>Home</LinkItem>
      <LinkItem to="/about" exact>About</LinkItem>
    </ul>
  );
}

export default Menu;
