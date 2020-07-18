// Libraries imports
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Relative imports
import styles from './Game.module.scss';
import Board from './Board';
import NavBar from '../Navbar/Navbar';
import Logo from './Logo.svg';

interface JoinedRoom {
  response: {
    board_id: string;
    seat: number; // 1 or 2
    player: {
      id: string;
      name: string;
    };
    matrix: {};
  };
}

const Game = () => {
  const { id, roomId } = useParams();
  const socket = io.connect(`http://178.128.206.150:7000/?id=${id}`);
  const history = useHistory();

  const markField = (field: number) => {
    socket.emit('mark_tile', roomId, field);
  };

  const listenForNewPlayers = () => {
    socket.on('joined', (resp: JoinedRoom) => {
      console.log(resp);
    });
  };

  const listenForMoves = () => {
    socket.on('marked', (resp: JoinedRoom) => {
      console.log(resp);
    });
  };
  useEffect(() => {
    const joinRoom = () => {
      socket.emit('join_room', roomId, (responseCode: number) => {
        if (responseCode !== 200) history.push('/boards');
        listenForNewPlayers();
        listenForMoves();
      });
    };
    joinRoom();
  }, []);
  return (
    <div className={styles.container}>
      <NavBar imgLink={Logo} />
      <Board markField={markField} />
    </div>
  );
};

export default Game;
