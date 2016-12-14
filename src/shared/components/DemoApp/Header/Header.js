/* @flow */

import React from 'react';
import Logo from './Logo';
import Menu from './Menu';

// We use `require` here instead of `import` to fix the issues detailed
// at https://github.com/styled-components/styled-components/issues/157
const styled = require('styled-components').default;

const HeaderWrapper = styled.div`
  font-size: 1.5em;
  margin-bottom: 1rem;
  text-align: center;
  color: #5499C7;
`
function Header() {
  return (
    <HeaderWrapper>
      <Logo />
      <h1>React, Universally</h1>
      <strong>
        A starter kit giving you the minimum requirements for a modern universal react application.
      </strong>
      <Menu />
    </HeaderWrapper>
  );
}

export default Header;
