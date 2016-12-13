/* @flow */

import React from 'react';
import { Link } from 'react-router';
// We use `require` here instead of `import` to fix the issues detailed
// at https://github.com/styled-components/styled-components/issues/157
const styled = require('styled-components').default;

const StyledMenu = styled.ul`
  margin-top: 1rem;
  background-color: #D4E6F1;
`

const StyledLink = styled(Link)`
  color: #5F6A6A;
  display: inline-block;
  margin: 0.5em 0;
  text-decoration: none;
  font-family: Helvetica, Arial, sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

function Menu() {
  return (
    <StyledMenu>
      <li><StyledLink to="/">Home</StyledLink></li>
      <li><StyledLink to="/about">About</StyledLink></li>
    </StyledMenu>
  );
}

export default Menu;
