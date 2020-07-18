// Libraries imports
import React from 'react';
import copy from 'copy-to-clipboard';

// Relative imports
import styles from './Board.module.scss';

interface Props {
  id: string;
  players: number;
}

const copyIdToClipboard = (id: string) => {
  copy(id);
};

const Board = ({ id, players }: Props) => {
  return (
    <div className={styles.container}>
      <p>ID</p>
      <span onClick={() => copyIdToClipboard(id)}>
        {id} <i className="fas fa-copy"></i>
      </span>
      <p>Players {players}/2</p>
      <button className="button is-warning is-rounded is-outlined">Join</button>
    </div>
  );
};

export default Board;
