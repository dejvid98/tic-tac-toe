// Libraries imports
import React from 'react';

// Relative imports
import styles from './Board.module.scss';
import BoardField from './BoardField';

interface Props {
  markField(fieldId: number): void;
}

const Board = ({ markField }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.firstBlock}>
        <BoardField mark={1} markField={markField} id={0} />
        <BoardField mark={1} markField={markField} id={1} />
        <BoardField mark={1} markField={markField} id={2} />
      </div>
      <div className={styles.secondBlock}>
        <BoardField mark={1} markField={markField} id={3} />
        <BoardField mark={1} markField={markField} id={4} />
        <BoardField mark={1} markField={markField} id={5} />
      </div>
      <div className={styles.thirdBlock}>
        <BoardField mark={1} markField={markField} id={6} />
        <BoardField mark={1} markField={markField} id={7} />
        <BoardField mark={1} markField={markField} id={8} />
      </div>
    </div>
  );
};

export default Board;
