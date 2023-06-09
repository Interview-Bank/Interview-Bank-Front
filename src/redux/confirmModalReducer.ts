import { createSlice } from '@reduxjs/toolkit';

interface ConfirmModalStateType {
  active: boolean;
  title: string;
  content: string;
  value: string;
}


const initialState: ConfirmModalStateType = {
  active: false,
  title: '',
  content: '',
  value: ''
};

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
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
      state.value = action.payload.value;
    },
  },
})

export const { CLOSE, OPEN } = confirmModalSlice.actions;

export default confirmModalSlice.reducer;