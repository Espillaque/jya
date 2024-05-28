import React, { useContext, useEffect, useState } from "react";
import { fetchEvents, fetchGames } from "../../api/calls";
import { MyContext } from "../../context";

const Lists = ({ handleSelectGame }) => {
  const { appState, setAppState } = useContext(MyContext);
  const { games, events } = appState;
  

  const loadData = async () => {
    const newGames = await fetchGames();
    const newEvents = await fetchEvents();
    setAppState({ ...appState, games: newGames, events: newEvents });
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleUseGame = (gameName, gameId) => {
    handleSelectGame({ name: gameName, id: gameId }); // Pasar el nombre y el ID del juego al componente PartyForm
  };

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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md h-96 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Lista</h2>
          <div className="space-y-4">
            {games.map((game) => (
              <div key={game.id} className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">{game.nombre}</h3>
                <p className="text-gray-600">{game.descripcion}</p>
                <p className="text-gray-500">
                  Máximo de jugadores: {game.max_jugadores}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={() => handleUseGame(game.nombre, game.id)}
                >
                  Usar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md h-96 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Eventos</h2>
          <div className="space-y-4">
            {events.map((event) => {
              const gameName1 = games.filter((g) => g.id === event.juego_id)[0]
                .nombre;
              return (
                <div key={event.id} className="p-4 border rounded-lg">
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
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                      onClick={() => handleJoinEvent(event.id, event.juego_id)}
                    >Unirse</button>
                     {event.master_id === appState.userId && (
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
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
