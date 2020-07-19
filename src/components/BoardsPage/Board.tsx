// Libraries imports
import React, { useEffect, useState } from 'react';

// Relative imports
import styles from './Board.module.scss';
import BoardField from './BoardField';
import store from '../../store/store';
import initalMatrix from '../../Util/initialMatrix';

interface Matrix {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
}

interface Props {
  markField(fieldId: number): void;
}

const Board = ({ markField }: Props) => {
  const [matrix, setMatrix] = useState<Matrix>(initalMatrix);

  useEffect(() => {
    // Sets initial matrix from store
    const storeState: any = store.getState();
    setMatrix(storeState.matrix);

    // Listens for updates from store and updates the matrix state accordingly
    store.subscribe(() => {
      const storeState: any = store.getState();
      setMatrix(storeState.matrix);
    });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.firstBlock}>
        <BoardField mark={matrix[0]} markField={markField} id={0} />
        <BoardField mark={matrix[1]} markField={markField} id={1} />
        <BoardField mark={matrix[2]} markField={markField} id={2} />
      </div>
      <div className={styles.secondBlock}>
        <BoardField mark={matrix[3]} markField={markField} id={3} />
        <BoardField mark={matrix[4]} markField={markField} id={4} />
        <BoardField mark={matrix[5]} markField={markField} id={5} />
      </div>
      <div className={styles.thirdBlock}>
        <BoardField mark={matrix[6]} markField={markField} id={6} />
        <BoardField mark={matrix[7]} markField={markField} id={7} />
        <BoardField mark={matrix[8]} markField={markField} id={8} />
      </div>
    </div>
  );
};

export default Board;
