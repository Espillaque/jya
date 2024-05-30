import React, { useContext, useEffect, useState } from "react";
import { fetchEvents, fetchGames } from "../../api/calls";
import { MyContext } from "../../context";

const Lists = ({ handleSelectGame }) => {
  const { appState, setAppState } = useContext(MyContext);
  const { games, events } = appState;
  
  // Function to load data asynchronously
  const loadData = async () => {
    const newGames = await fetchGames();
    const newEvents = await fetchEvents();
    setAppState({ ...appState, games: newGames, events: newEvents });
  };

  useEffect(() => {
    loadData();
  }, []);
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleUseGame = (gameName, gameId) => {
    // Pass the game name and ID to the PartyForm component
    handleSelectGame({ name: gameName, id: gameId }); 
  };
  //Function to join an event
  const handleJoinEvent = async (eventoId, juegoId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "usuario_id": appState.userId,
      "juego_id": juegoId,
      "evento_id": eventoId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:5000/participations/create", requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  //Function to delete an event
  const handleDeleteEvent = async (eventoId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ id: eventoId });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/events/delete", requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  return (
    <div className="w-full p-4 bg-malachite-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-malachite-50 p-6 rounded-lg shadow-md h-96 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Lista</h2>
          <div className="space-y-4">
            {games.map((game) => (
              <div key={game.id} className="p-4 border rounded-lg bg-sapphire-100">
                <h3 className="text-lg font-semibold">{game.nombre}</h3>
                <p className="text-gray-600">{game.descripcion}</p>
                <p className="text-gray-500">
                  Máximo de jugadores: {game.max_jugadores}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-sapphire-500 text-malachite-50 rounded hover:bg-sapphire-700"
                  onClick={() => handleUseGame(game.nombre, game.id)}
                >
                  Usar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-malachite-50 p-6 rounded-lg shadow-md h-96 overflow-y-auto ">
          <h2 className="text-xl font-bold mb-4">Eventos</h2>
          <div className="space-y-4">
            {/* Iterates over a map of events, if the id of event.juego_id matches the id of games it will take the name */}
            {events.map((event) => {
              const gameName1 = games.filter((g) => g.id === event.juego_id)[0]
                .nombre;
              return (
                <div key={event.id} className="p-4 border rounded-lg bg-sapphire-100">
                  <p className="text-gray-600">
                    <strong>Fecha:</strong> {formatDate(event.fecha)}
                  </p>
                  <p className="text-gray-600">
                    <strong>Dirección:</strong> {event.direccion}
                  </p>
                  <p className="text-gray-600">
                    <strong>Juego:</strong>
                    {gameName1}
                  </p>
                  <p className="text-gray-600">
                    <strong>Descripción:</strong> {event.descripcion}
                  </p>
                  <div className="mt-2 space-x-2">
                  <button
                      className="px-4 py-2 bg-sapphire-500 text-malachite-50 rounded hover:bg-sapphire-700"
                      onClick={() => handleJoinEvent(event.id, event.juego_id)}
                    >Unirse</button>
                     {event.master_id === appState.userId && (
                      <button
                        className="px-4 py-2 bg-red-100 text-malachite-50 rounded hover:bg-red-200"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
