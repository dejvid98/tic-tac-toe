// Libraries imports
import React from 'react';
import copy from 'copy-to-clipboard';
import { Link } from 'react-router-dom';

// Relative imports
import styles from './ListItemCard.module.scss';

interface Props {
  id: string;
  players: number;
  userId: string;
}

const copyIdToClipboard = (id: string) => {
  copy(id);
};

const Board = ({ id, players, userId }: Props) => {
  return (
    <div className={styles.container}>
      <p>ID</p>
      <span onClick={() => copyIdToClipboard(id)}>
        {id} <i className="fas fa-copy"></i>
      </span>
      <p>Players {players}/2</p>
      <Link to={`/game/${userId}/${id}`}>
        <button className="button is-warning is-rounded is-outlined">
          Join
        </button>
      </Link>
    </div>
  );
};

export default Board;
