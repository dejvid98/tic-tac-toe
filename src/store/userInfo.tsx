import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'userInfo',
  initialState: {
    apikey: '',
    name: '',
    id: '',
  },
  reducers: {
    addKey(state, action) {
      return { ...state, apikey: action.payload.apikey };
    },
    addInfo(state, action) {
      return { ...state, name: action.payload.name, id: action.payload.id };
    },
  },
});

export const { addKey, addInfo } = slice.actions;

export default slice.reducer;
