import React, { useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import PartyForm from "../components/forms/formParty";
import Header from "../components/header-footer/header";
import Footer from "../components/header-footer/footer";
import FormList from "../components/list/list";
import { MyContext } from "../context";
import ROUTES from "../router/routes";
//Debajo del partyform tiene que salir todas las party que he creado con opciones de modificar y borrar, añadir en el partyform el juego y el lugar

const Main = () => {
  const { contextData, setContextData } = useContext(MyContext);

  useEffect(() => {
    if (!contextData.token) {
      console.log("REDIREEEECTUS!");
      setContextData({ ...contextData, activeRoute: ROUTES.LOGIN });
    }
  });

  return (
    <>
      <Header />
      <PartyForm />
      {/* {data.map((event)=>(
            <FormList
                key={event.id}
                event={event}
            />
        ))} */}

      <Footer />
    </>
  );
};

export default Main;
