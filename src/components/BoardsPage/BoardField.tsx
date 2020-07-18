// Libraries imports
import React from 'react';

// Relative imports
import styles from './BoardField.module.scss';

interface Props {
  id: number;
  mark: number;
  markField(fieldId: number): void;
}

const BoardField = ({ id, mark, markField }: Props) => {
  return (
    <div className={styles.container} onClick={() => markField(id)}>
      <p>{mark === 1 ? 'X' : null}</p>
      <p>{mark === 2 ? 'O' : null}</p>
    </div>
  );
};

export default BoardField;
