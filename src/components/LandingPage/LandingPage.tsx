// Libraries imports
import React from 'react';

// Relative imports
import styles from './LandingPage.module.scss';
import Navbar from '../Navbar/Navbar';
import Registration from './Registration';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <Navbar />
      </header>
      <main className={styles.registrationContainer}>
        <Registration />
      </main>
    </div>
  );
};

export default LandingPage;
