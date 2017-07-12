import React from 'react';
import Logo from './Logo';
import Menu from './Menu';

import styles from './styles.scss';

function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <h1>React, Universally</h1>
      <strong>
        A starter kit for universal react applications.
      </strong>
      <Menu />
    </div>
  );
}

export default Header;
