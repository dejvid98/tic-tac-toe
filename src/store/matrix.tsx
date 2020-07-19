import { createSlice } from '@reduxjs/toolkit';
import initalMatrix from '../Util/initialMatrix';

const slice = createSlice({
  name: 'matrix',
  initialState: initalMatrix,
  reducers: {
    updateMatrix(state, action) {
      return { ...action.payload.matrix };
    },
    resetMatrix(state, action) {
      return { ...initalMatrix };
    },
  },
});

export const { updateMatrix, resetMatrix } = slice.actions;

export default slice.reducer;
