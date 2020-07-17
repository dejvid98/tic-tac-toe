import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <img src="Logo.svg" alt="Tic-tac-toe logo" />
    </div>
  );
};

export default Navbar;
