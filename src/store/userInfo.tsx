import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'userInfo',
  initialState: {},
  reducers: {
    addKey(state, action) {
      return { ...state, apikey: action.payload.apikey };
    },
    addName(state, action) {
      return { ...state, name: action.payload.name };
    },
  },
});

export const { addKey, addName } = slice.actions;

export default slice.reducer;
