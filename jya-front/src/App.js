import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import ContextProvider from "./context";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
