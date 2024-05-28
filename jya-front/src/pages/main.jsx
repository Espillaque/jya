import React, { useContext, useEffect, useState } from "react";
import PartyForm from "../components/forms/formParty";
import Header from "../components/header-footer/header";
import Footer from "../components/header-footer/footer";
import Lists from "../components/list/lists";
import { MyContext } from "../context";
import ROUTES from "../router/routes";

const Main = () => {
  const { appState, setAppState } = useContext(MyContext);
  const [selectedGame, setSelectedGame] = useState({ id: null, name: "" });
  useEffect(() => {
    if (!appState.token) {
      console.log("REDIREEEECTUS!");
      setAppState({ ...appState, activeRoute: ROUTES.LOGIN });
    }
  });

  return (
    <>
      <Header />
      <PartyForm selectedGame={selectedGame} />
      <Lists handleSelectGame={setSelectedGame} />
      <Footer />
    </>
  );
};

export default Main;
