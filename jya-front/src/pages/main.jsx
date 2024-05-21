import React from 'react';
import { useNavigate } from 'react-router-dom';
import PartyForm from '../components/forms/formParty';
import Header from '../components/header-footer/header';
import Footer from '../components/header-footer/footer';
import FormList from '../components/list/list';
//Debajo del partyform tiene que salir todas las party que he creado con opciones de modificar y borrar, añadir en el partyform el juego y el lugar 

const Main = () => {
    return (
        <>
        <Header/>
        <PartyForm/>
        {data.map((event)=>(
            <FormList
                key={event.id}
                event={event}
            />
        ))}
        
        <Footer/>
        </>
    );
}

export default Main;