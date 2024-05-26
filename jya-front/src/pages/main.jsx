import React, { useContext, useEffect,useState } from "react";
import PartyForm from "../components/forms/formParty";
import Header from "../components/header-footer/header";
import Footer from "../components/header-footer/footer";
import Lists from "../components/list/lists";
import { MyContext } from "../context";
import ROUTES from "../router/routes";

const Main = () => {
  const { contextData, setContextData } = useContext(MyContext);
  const [selectedGame, setSelectedGame] = useState('');
  useEffect(() => {
    if (!contextData.token) {
      console.log("REDIREEEECTUS!");
      setContextData({ ...contextData, activeRoute: ROUTES.LOGIN });
    }
  });

  return (
    <>
      <Header />
      <PartyForm selectedGame={selectedGame}/>
      <Lists setSelectedGame={setSelectedGame}/>
      <Footer />
    </>
  );
};

export default Main;
