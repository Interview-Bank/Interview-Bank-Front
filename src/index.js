import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/configStore";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log("REACT_APP_API_ACCOUNT_BASE_URL:", process.env.REACT_APP_API_ACCOUNT_BASE_URL);
console.log("REACT_APP_API_ACCOUNT_OAUTH_BASE_URL:", process.env.REACT_APP_API_ACCOUNT_OAUTH_BASE_URL);
console.log("REACT_APP_API_INQURIRY_BASE_URL:", process.env.REACT_APP_API_INQURIRY_BASE_URL);
console.log("REACT_APP_API_INTERVIEW_BASE_URL:", process.env.REACT_APP_API_INTERVIEW_BASE_URL);
console.log("REACT_APP_API_JOBCATEGORY_BASE_URL:", process.env.REACT_APP_API_JOBCATEGORY_BASE_URL);
console.log("REACT_APP_API_SCRAP_BASE_URL:", process.env.REACT_APP_API_SCRAP_BASE_URL);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
