import React from 'react';
import { styled } from 'styletron-react';
import Logo from './Logo';
import Menu from './Menu';
import Centered from '../lib/layout/Centered';

const CenteredWithBottomMargin = styled(Centered, {
  marginBottom: '1rem',
});

function Header() {
  return (
    <CenteredWithBottomMargin>
      <Logo />
      <h1>React, Universally</h1>
      <strong>
        A starter kit giving you the minimum requirements for a modern universal react application.
      </strong>
      <Menu />
    </CenteredWithBottomMargin>
  );
}

export default Header;
