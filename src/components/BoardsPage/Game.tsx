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
import { updateMatrix, resetMatrix } from '../../store/matrix';
import store from '../../store/store';

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

interface SocketResponse {
  board_id: string;
  seat: number;
  player: {
    id: string;
    name: string;
  };
  matrix: Matrix;
}

const Game = () => {
  const { id, roomId } = useParams();
  const [alert, setAlert] = useState('');
  const [playerNumber, setPlayerNumber] = useState(0);
  const [opponent, setOpponent] = useState('');
  const [isWaiting, setIsWaiting] = useState(true);
  const history = useHistory();

  const socket = io.connect(`http://178.128.206.150:7000/?id=${id}`, {
    forceNew: true,
  });

  const markField = (field: number) => {
    socket.emit('mark_tile', roomId, field, (responseCode: number) => {
      if (responseCode !== 200) {
        setAlert('Invalid tile');
        setTimeout(() => setAlert(''), 3000);
      }
    });
  };
  const restartGame = () => {
    socket.emit('restart', roomId, (responseCode: number) => {
      if (responseCode === 200) {
        setAlert('Game restarted');
        setTimeout(() => setAlert(''), 3000);
      }
    });
  };

  useEffect(() => {
    const joinRoom = () => {
      socket.emit('join_room', roomId, (responseCode: number) => {
        if (responseCode !== 200) history.push('/');
      });
    };

    const listenForMoves = () => {
      socket.on('marked', (response: SocketResponse) => {
        store.dispatch(updateMatrix({ matrix: response.matrix }));
      });
    };

    const listenForNewPlayers = () => {
      socket.on('joined', (response: SocketResponse) => {});
    };
    joinRoom();

    listenForMoves();

    listenForNewPlayers();
  }, []);
  return (
    <div className={styles.container}>
      <NavBar imgLink={Logo} />
      <div className={styles.innerContainer}>
        {isWaiting ? (
          <div className={styles.waitingAlert}>
            <p>Waiting for opponent...</p>
          </div>
        ) : null}

        <Board markField={markField} />

        {alert ? (
          <div className={styles.alertWrapper}>
            <p>{alert}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Game;
