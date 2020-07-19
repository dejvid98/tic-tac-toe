// Libraries imports
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Relative imports
import styles from './Game.module.scss';
import Board from './Board';
import NavBar from '../Navbar/Navbar';
import Scoreboard from './ScoreBoard';
import Logo from './Logo.svg';
import { updateMatrix, resetMatrix } from '../../store/matrix';
import { updateInfo, updateScore } from '../../store/gameInfo';
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
  const history = useHistory();

  const socket = io.connect(`http://178.128.206.150:7000/?id=${id}`, {
    forceNew: true,
  });

  const markField = (field: number) => {
    socket.emit('mark_tile', roomId, field);
  };

  useEffect(() => {
    const restartGame = () => socket.emit('restart', roomId);

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

    const listenForTie = () => {
      socket.on('tie', () => {
        restartGame();
        store.dispatch(resetMatrix({ matrix: initalMatrix }));
      });
    };

    const listenForWin = () => [
      socket.on('win', (resposne: SocketResponse) => {
        const storeInfo = store.getState();
        const { userInfo, gameInfo } = storeInfo;
        const { playerNumber, score } = gameInfo;

        if (resposne.player.name === userInfo.name) {
          if (playerNumber === 1) {
            store.dispatch(
              updateScore({
                score: {
                  player1: score.player1 + 1,
                  player2: score.player2,
                },
              })
            );
          } else {
            store.dispatch(
              updateScore({
                score: {
                  player1: score.player1,
                  player2: score.player2 + 1,
                },
              })
            );
          }
        } else {
          if (playerNumber === 1) {
            store.dispatch(
              updateScore({
                score: {
                  player1: score.player1,
                  player2: score.player2 + 1,
                },
              })
            );
          } else {
            store.dispatch(
              updateScore({
                score: {
                  player1: score.player1 + 1,
                  player2: score.player2,
                },
              })
            );
          }
        }
        restartGame();
        store.dispatch(resetMatrix({ matrix: initalMatrix }));
      }),
    ];

    const listenForNewPlayers = () => {
      socket.on('joined', (response: SocketResponse) => {
        const storeInfo = store.getState();
        const { name } = storeInfo.userInfo;
        // Checks to see if recently joined player is different person
        // if true, sets the info about the game
        if (response.player.name !== name) {
          const playerNumber = response.seat === 1 ? 2 : 1;
          const opponentName = response.player.name;
          store.dispatch(
            updateInfo({ name, playerNumber, opponentName, isWaiting: false })
          );
        } else {
          const playerNumber = response.seat;
          const isWaiting = playerNumber === 1 ? true : false;
          store.dispatch(
            updateInfo({
              name,
              playerNumber,
              opponentName: 'Opponent',
              isWaiting,
            })
          );
        }
      });
    };

    listenForNewPlayers();
    joinRoom();
    listenForMoves();
    listenForWin();
    listenForTie();
  }, [history, roomId, socket]);
  return (
    <div className={styles.container}>
      <NavBar imgLink={Logo} />
      <div className={styles.innerContainer}>
        <Scoreboard />
        <Board markField={markField} />
      </div>
    </div>
  );
};

export default Game;
