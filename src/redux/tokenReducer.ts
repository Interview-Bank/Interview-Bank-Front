import { createSlice } from '@reduxjs/toolkit';

interface TokenStateType {
  headers: {};
}


const initialState: TokenStateType = {
  headers: {},
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    SET: (state, action) => {
      state.headers = action.payload.headers;
    },
  },
})

export const { SET } = tokenSlice.actions;

export default tokenSlice.reducer;