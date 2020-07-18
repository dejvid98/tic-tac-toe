// Libraries imports
import React, { useState, useEffect } from 'react';

// Relative imports
import styles from './BoardsPage.module.scss';
import Navbar from '../Navbar/Navbar';
import store from '../../store/store';
import HTTP from '../../Util/HTTPRequest';
import Board from './BoardCard';

interface Store {
  userInfo: {
    apikey: string;
    name: string;
    id: string;
  };
}

interface Board {
  id: string;
  players: number;
}

const BoardsPage = () => {
  const [apikey, setApikey] = useState('');
  const [boards, setBoards] = useState<Board[]>([]);
  const [userId, setUserId] = useState('');
  const [alert, setAlert] = useState('');
  const [boardsNum, setBoardsNum] = useState(0);

  const createBoard = async () => {
    try {
      const boardResp = await HTTP.post('/create_board', { apikey });
      if (boardResp.status === 200) setAlert('Board successfully created');
      setTimeout(() => setAlert(''), 3000);
      setBoardsNum((board) => board + 1);
    } catch (error) {
      setAlert(error.message);
      setTimeout(() => setAlert(''), 3000);
    }
  };

  useEffect(() => {
    // Retrieves user info from the store
    const storeState: Store = store.getState();
    const { apikey, id } = storeState.userInfo;
    setApikey(apikey);
    setUserId(id);
  }, []);

  useEffect(() => {
    // Retrieves the list of player's boards
    const getUserBoards = async () => {
      try {
        const boardsResp = await HTTP.post('/boards', { apikey });
        if (boardsResp.status === 200) setBoards(boardsResp.data);
      } catch (error) {
        setAlert(error.message);
        setTimeout(() => setAlert(''), 3000);
      }
    };

    if (apikey) getUserBoards();
  }, [apikey, boardsNum]);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.innerContainer}>
        <div className={styles.noteWrapper}>
          <p>Note : You can click on game's ID to copy it to clipboard!</p>
        </div>
        <div className={styles.buttonWrapper}>
          <button
            className="button is-success is-rounded"
            onClick={createBoard}
          >
            Create Board
          </button>
          <button className="button is-link is-rounded">Join Game</button>
        </div>

        {alert ? (
          <div className={styles.alertWrapper}>
            <p>{alert}</p>
          </div>
        ) : null}

        <div className={styles.boardsWrapper}>
          {boards.length > 0 ? (
            boards.map((board) => (
              <Board
                id={board.id}
                players={board.players}
                key={board.id}
                userId={userId}
              />
            ))
          ) : (
            <span className={styles.noBoardsAlert}>
              <p>Your boards list is currently empty.</p>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;
