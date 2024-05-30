import React, { useContext, useEffect } from "react";
import Header from "../components/header-footer/header";
import Footer from "../components/header-footer/footer";
import { MyContext } from "../context";
import ROUTES from "../router/routes";
import GameForm from "../components/forms/formGame";

const Game = () => {
  const { appState, setAppState } = useContext(MyContext);
// Check if the token is not present, and if so, redirect to the login page
  useEffect(() => {
    if (!appState.token) {
      console.log("REDIREEEECTUS!");
      setAppState({ ...appState, activeRoute: ROUTES.LOGIN });
    }
  });

  return (
    <>
      <Header />
      <GameForm />
      <Footer />
    </>
  );
};

export default Game;
