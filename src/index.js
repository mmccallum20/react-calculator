import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {actionReducer} from "./actionReducer";

const root = ReactDOM.createRoot(document.getElementById("root"));

const reducer = combineReducers({ actionReducer});
const store = configureStore({ reducer });

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export default store;
