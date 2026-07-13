import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootreducer } from "./Reducer";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer:rootreducer,
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
  <App />
  <Toaster/>
  </Provider>
  
 
  
    
  </BrowserRouter>
   
  </React.StrictMode>
);
