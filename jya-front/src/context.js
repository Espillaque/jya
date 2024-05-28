import React, { useEffect, useState } from "react";
import ROUTES from "./router/routes";

export const MyContext = React.createContext();

const INITIAL_STATE = {
  token: "",
  userName: "",
  userId: "",
  games: [],
  events: [],
  activeRoute: ROUTES.LOGIN,
};

const STORAGE_KEY = "STORAGE_KEY";

const ContextProvider = (props) => {
  const loadInitialState = () => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : INITIAL_STATE;
  };

  const [appState, setAppState] = useState(loadInitialState);

  // Actualizamos el localStorage cada vez que el appState cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  // Función para borrar el localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAppState(INITIAL_STATE); // Opcional: resetear el estado a su valor inicial
  };

  return (
    <MyContext.Provider value={{ appState, setAppState, clearLocalStorage }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
