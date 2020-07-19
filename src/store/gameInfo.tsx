import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'gameInfo',
  initialState: {
    playerNumber: 1,
    opponentName: 'Opponent',
    score: {
      player1: 0,
      player2: 0,
    },
    isWaiting: true,
  },
  reducers: {
    updateInfo(state, action) {
      return {
        ...state,
        playerNumber: action.payload.playerNumber,
        opponentName: action.payload.opponentName,
        isWaiting: action.payload.isWaiting,
      };
    },

    updateScore(state, action) {
      return { ...state, score: action.payload.score };
    },
  },
});

export const { updateInfo, updateScore } = slice.actions;

export default slice.reducer;
