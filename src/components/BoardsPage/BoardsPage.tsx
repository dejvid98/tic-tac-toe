// Libraries imports
import React, { useState, useEffect } from 'react';

// Relative imports
import styles from './BoardsPage.module.scss';
import Navbar from '../Navbar/Navbar';
import store from '../../store/store';
import HTTP from '../../Util/HTTPRequest';

interface Store {
  userInfo: {
    apikey: string;
    name: string;
  };
}

const BoardsPage = () => {
  const [apikey, setApikey] = useState('');
  const [name, setName] = useState('');
  const [boards, setBoards] = useState([]);

  const createTable = async() =>{
    
  }

  useEffect(() => {
    // Retrieves user info from the store
    const storeState: Store = store.getState();
    const { apikey, name } = storeState.userInfo;
    setApikey(apikey);
    setName(name);

    // Retrieves the list of player's boards
    const getUserBoards = async () => {
      const boardsResp = await HTTP.post('/boards', { apikey });
      if (boardsResp.status === 200) setBoards(boardsResp.data);
    };

    // getUserBoards();
  }, []);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.innerContainer}>
        <div className={styles.buttonWrapper}>
          <button className="button is-success is-rounded">Create Table</button>
          <button className="button is-link is-rounded">Join Game</button>
        </div>

        <div className={styles.boardsWrapper}></div>
      </div>
    </div>
  );
};

export default BoardsPage;
