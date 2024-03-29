import { persistReducer } from "redux-persist";
import { AuthReducer } from "./Reducers/AuthReducer";
import { ModalReducer } from "./Reducers/ModalReducer";
import { createStore, combineReducers } from "redux";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
};

const allReducers = combineReducers({
  Auth: AuthReducer,
  Modal: ModalReducer
});

const store = createStore(
  persistReducer(persistConfig, allReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
