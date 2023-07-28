import { createWrapper } from 'next-redux-wrapper'
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import modalReducer from './modalReducer';
import confirmModalReducer from './confirmModalReducer';
import tokenReducer from './tokenReducer';
// import menuReducer from './menuReducer';

// const rootReducer = combineReducers({
//   modalReducer,
// });

// export default rootReducer;

const rootStore = () => (
  configureStore({
    reducer: {
      modal: modalReducer,
      confirmModal: confirmModalReducer,
      token: tokenReducer,
      // menu: menuReducer,
    },
  })
)

export type Appstore = ReturnType<typeof rootStore>;
export type Appstate = ReturnType<Appstore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  Appstate,
  unknown,
  Action
>;

export const wrapper = createWrapper<Appstore>(rootStore);