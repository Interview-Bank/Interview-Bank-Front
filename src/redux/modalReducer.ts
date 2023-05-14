import { createSlice } from '@reduxjs/toolkit';

interface ModalStateType {
  active: boolean;
  title: string;
  content: string;
}


const initialState: ModalStateType = {
  active: false,
  title: '',
  content: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    CLOSE: (state) => {
      state.active = initialState.active;
      state.title = initialState.title;
      state.content = initialState.content;
    },
    OPEN: (state, action) => {
      state.active = !state.active;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
  },
})

export const { CLOSE, OPEN } = modalSlice.actions;

export default modalSlice.reducer;