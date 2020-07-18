import React from 'react';
import styles from './Navbar.module.scss';

interface Props {
  imgLink: string;
}

const Navbar = ({ imgLink }: Props) => {
  return (
    <div className={styles.container}>
      <img src={imgLink} alt="Tic-tac-toe logo" />
    </div>
  );
};

export default Navbar;
