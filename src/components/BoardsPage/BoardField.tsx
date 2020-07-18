// Libraries imports
import React from 'react';

// Relative imports
import styles from './BoardField.module.scss';

interface Props {
  mark: number;
}

const BoardField = ({ mark }: Props) => {
  return (
    <div className={styles.container}>
      <p>{mark === 1 ? 'X' : null}</p>
      <p>{mark === 2 ? 'O' : null}</p>
    </div>
  );
};

export default BoardField;
