// Libraries imports
import React from 'react';

// Relative imports
import styles from './Board.module.scss';
import BoardField from './BoardField';

const Board = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstBlock}>
        <BoardField mark={1} />
        <BoardField mark={1} />
        <BoardField mark={1} />
      </div>
      <div className={styles.secondBlock}>
        <BoardField mark={1} />
        <BoardField mark={1} />
        <BoardField mark={1} />
      </div>
      <div className={styles.thirdBlock}>
        <BoardField mark={1} />
        <BoardField mark={1} />
        <BoardField mark={1} />
      </div>
    </div>
  );
};

export default Board;
