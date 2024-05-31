import React, { useRef, useState } from "react";

const GameboardForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const gameNameRef = useRef(null);
  const maxPlayersRef = useRef(null);
  const descriptionRef = useRef(null);

  //Function that handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameName = gameNameRef.current.value;
    const maxPlayers = maxPlayersRef.current.value;
    const description = descriptionRef.current.value;

    // Fetch request configuration to check if the game exists
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: gameName }),
      redirect: "follow",
    };

    try {
      // Perform the fetch request to check if the game exists
      const response = await fetch(
        "http://localhost:5000/games/find",
        requestOptions,
      );
      const data = await response.json();

      if (data.exists) {
        // If the game exists, show a message
        setIsDuplicate(true);
        setIsError(false);
        setIsSubmitted(false);
      } else {
        // If the game doesn´t exist, create the game
        setIsDuplicate(false);

        // Fetch request configuration to create the game
        const createRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: gameName,
            max_jugadores: maxPlayers,
            descripcion: description,
          }),
          redirect: "follow",
        };

        // Perform the fetch request to create the game
        const response = await fetch(
          "http://localhost:5000/games/create",
          createRequestOptions,
        );

        // Check if the creation was correct
        if (response.status === 201) {
          // If it was correct, set the submitted state to true and clear form
          setIsSubmitted(true);
          setIsError(false);
          setIsDuplicate(false);
          gameNameRef.current.value = "";
          maxPlayersRef.current.value = "";
          descriptionRef.current.value = "";
        } else {
          // If there was an error creating the game, it shows an error message
          setIsError(true);
          setIsSubmitted(false);
          setIsDuplicate(false);
        }
      }
    } catch (error) {
      // If there was a fetch error, show an error message
      setIsError(true);
      setIsSubmitted(false);
      setIsDuplicate(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-malachite-100">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <form
          onSubmit={handleSubmit}
          className="w-full p-8 my-4 md:px-12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl border bg-malachite-50"
        >
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl">
              Introduce a <br /> gameboard
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              ref={gameNameRef}
              className="w-full  mt-2 p-3 rounded-lg border border-sapphire-700 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Board game name*"
              required
            />
            <input
              ref={maxPlayersRef}
              className="w-full  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline border border-sapphire-700"
              type="number"
              placeholder="Maximum players*"
              required
              min={1}
            />
          </div>
          <div className="my-4">
            <textarea
              ref={descriptionRef}
              placeholder="Description*"
              className="w-full h-32  mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline border border-sapphire-700"
              required
            ></textarea>
          </div>
          <div className="my-2 w-1/2 lg:w-1/4">
            <button
              type="submit"
              className="uppercase text-sm font-bold tracking-wide bg-sapphire-500  hover:bg-sapphire-700 text-sapphire-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
            >
              ¡Nice one!
            </button>
          </div>
          {/* Show messages depending of request state */}
          {isSubmitted && (
            <div className="mt-4 p-3 bg-malachite-200 text-green-700 rounded-lg">
              ¡El juego de mesa ha sido creado exitosamente!
            </div>
          )}
          {isError && (
            <div className="mt-4 p-3 bg-red-200 text-red-700 rounded-lg">
              Hubo un error al crear el juego de mesa. Por favor, inténtalo de
              nuevo.
            </div>
          )}
          {isDuplicate && (
            <div className="mt-4 p-3 bg-red-200 text-yellow-700 rounded-lg">
              ¡El juego de mesa ya existe! Por favor, elige un nombre diferente.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default GameboardForm;
