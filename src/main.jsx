// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./RTKQuery/apiSlice.js";
import { Provider } from "react-redux";
import { store } from "./RTKQuery/store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  // Using the Api direct
  // <ApiProvider api={api}>
  //   <App />
  // </ApiProvider>

  
  // Using the Redux Store
  <Provider store={store}>
     <App />
   </Provider>
  // </StrictMode>,
);
