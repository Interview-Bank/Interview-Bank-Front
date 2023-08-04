import { createSlice } from '@reduxjs/toolkit';

interface ConfirmModalStateType {
  active          : boolean;
  title           : string;
  content         : string;
  value           : string;
  yes             : string;
  no              : string;
  onClickEvent    : () => void;
}


const initialState: ConfirmModalStateType = {
  active          : false,
  title           : '',
  content         : '',
  value           : '',
  yes             : '',
  no              : '',
  onClickEvent    : () => {}
};

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState,
  reducers: {
    CLOSE: (state) => {
      state.active          = initialState.active;
      state.title           = initialState.title;
      state.content         = initialState.content;
      state.yes             = initialState.yes;
      state.no              = initialState.no;
      state.onClickEvent    = initialState.onClickEvent;
    },
    OPEN: (state, action) => {
      state.active          = !state.active;
      state.title           = action.payload.title;
      state.content         = action.payload.content;
      state.value           = action.payload.value;
      state.yes             = action.payload.yes;
      state.no              = action.payload.no;
      state.onClickEvent    = action.payload.onClickEvent;
    },
  },
})

export const { CLOSE, OPEN } = confirmModalSlice.actions;

export default confirmModalSlice.reducer;