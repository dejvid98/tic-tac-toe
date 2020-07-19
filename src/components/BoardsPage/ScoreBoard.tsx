// Libraries imports
import React, { useState, useEffect } from 'react';

// Relative imports
import styles from './ScoreBoard.module.scss';
import store from '../../store/store';

const ScoreBoard = () => {
  const [name, setName] = useState('');
  const [playerNumber, setPlayerNumber] = useState(1);
  const [opponent, setOpponent] = useState('Opponent');
  const [isWaiting, setIsWaiting] = useState(true);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    const storeState = store.getState();
    const { gameInfo, userInfo } = storeState;
    setName(userInfo.name);
    setPlayerNumber(gameInfo.playerNumber);

    store.subscribe(() => {
      const storeState = store.getState();
      const { gameInfo } = storeState;
      setOpponent(gameInfo.opponentName);
      setPlayerNumber(gameInfo.playerNumber);
      setScore(gameInfo.score);
      setIsWaiting(gameInfo.isWaiting);
    });
  }, []);
  return (
    <div className={styles.container}>
      {isWaiting ? (
        <div className={styles.waitingAlert}>
          <p>Waiting for opponent...</p>
        </div>
      ) : playerNumber === 1 ? (
        <div>
          <p>
            {name} {score.player1} : {score.player2} {opponent}
          </p>
        </div>
      ) : (
        <div>
          <p>
            {opponent} {score.player1} : {score.player2} {name}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
