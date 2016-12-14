/* @flow */

import React from 'react';
import { Link } from 'react-router';
import HorizontalList from '../../lib/layout/HorizontalList';

function Menu() {
  return (
    <HorizontalList>
      <HorizontalList.Item><Link to="/">Home</Link></HorizontalList.Item>
      <HorizontalList.Item><Link to="/about">About</Link></HorizontalList.Item>
    </HorizontalList>
  );
}

export default Menu;
