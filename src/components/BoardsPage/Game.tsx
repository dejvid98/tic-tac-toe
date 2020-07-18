// Libraries imports
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Relative imports
import styles from './Game.module.scss';

const Game = () => {
  const { id, roomId } = useParams();
  const socket = io.connect(`http://178.128.206.150:7000/?id=${id}`);
  const history = useHistory();

  useEffect(() => {
    const joinRoom = () => {
      socket.emit('join_room', roomId, (responseCode: number) => {
        if (responseCode !== 200) history.push('/boards');
      });
    };
    joinRoom();
  }, []);
  return (
    <div className={styles.container}>
      <h1></h1>
    </div>
  );
};

export default Game;
