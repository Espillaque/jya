import React, { useRef, useContext } from "react";
import { MyContext } from "../../context";
import { fetchEvents, fetchGames } from "../../api/calls";

const PartyForm = ({ selectedGame }) => {
  const { appState, setAppState } = useContext(MyContext);
  const selectedGameId = selectedGame.id;
  const directionRef = useRef(null);
  const dateRef = useRef(null);
  const descriptionRef = useRef(null);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const loadData = async () => {
    const newGames = await fetchGames();
    const newEvents = await fetchEvents();
    setAppState({ ...appState, games: newGames, events: newEvents });
  };

   const onSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada y recargue la página.

    const formData = {
      gameId: selectedGameId,
      place: directionRef.current.value,
      date: dateRef.current.value,
      description: descriptionRef.current.value,
    };
    console.log("Form data:", formData);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      master_id: appState.userId,
      juego_id: formData.gameId,
      fecha: formData.date,
      direccion: formData.place,
      descripcion: formData.description,
    });

    console.log("Payload:", raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/events/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    await sleep(2000); 
    loadData();
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl border">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl">
              Organiza una <br /> quedada
            </h1>
          </div>
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5"
          >
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Busca en la lista de abajo el juego*"
              value={selectedGame.name}
              disabled
            />
            <input
              name="direction"
              ref={directionRef}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Direction*"
            />
            <input
              name="date"
              ref={dateRef}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="date"
              placeholder="Date*"
            />
            <div className="col-span-2">
              <textarea
                name="description"
                ref={descriptionRef}
                placeholder="Descripción*"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <button
                type="submit"
                className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                onSubmit={onSubmit}
              >
                ¡A jugar!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartyForm;
