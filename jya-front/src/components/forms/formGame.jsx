import React, { useRef, useState } from 'react';

const GameboardForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const gameNameRef = useRef(null);
  const maxPlayersRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameName = gameNameRef.current.value;
    const maxPlayers = maxPlayersRef.current.value;
    const description = descriptionRef.current.value;

    // Configuración de la solicitud fetch para verificar si el juego existe
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre:gameName }),
      redirect: 'follow',
    };

    try {
      // Realizar la solicitud fetch para verificar si el juego existe
      const response = await fetch('http://localhost:5000/games/find', requestOptions);
      const data = await response.json();

      if (data.exists) {
        // Si el juego ya existe, muestra un mensaje de duplicado
        setIsDuplicate(true);
        setIsError(false);
        setIsSubmitted(false);
      } else {
        // Si el juego no existe, procede con la creación del juego
        setIsDuplicate(false);

        // Configuración de la solicitud fetch para crear el juego
        const createRequestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre:gameName, max_jugadores:maxPlayers, descripcion:description }),
          redirect: 'follow',
        };

        // Realizar la solicitud fetch para crear el juego
        const createResponse = await fetch('http://localhost:5000/games/create', createRequestOptions);
        const createData = await createResponse.json();

        // Verificar si la creación fue exitosa
        if (createData.success) {
          // Si la creación fue exitosa, establece el estado de enviado a verdadero y limpia el formulario
          setIsSubmitted(true);
          setIsError(false);
          setIsDuplicate(false);
          gameNameRef.current.value = '';
          maxPlayersRef.current.value = '';
          descriptionRef.current.value = '';
        } else {
          // Si hubo un error al crear el juego, muestra un mensaje de error
          setIsError(true);
          setIsSubmitted(false);
          setIsDuplicate(false);
        }
      }
    } catch (error) {
      // Si hubo un error en la solicitud fetch, muestra un mensaje de error
      setIsError(true);
      setIsSubmitted(false);
      setIsDuplicate(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <form onSubmit={handleSubmit} className="w-full p-8 my-4 md:px-12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl border">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl">
              Introduce a <br /> gameboard
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              ref={gameNameRef}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Nombre del juego de mesa*"
              required
            />
            <input
              ref={maxPlayersRef}
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Máximo jugadores*"
              required
            />
          </div>
          <div className="my-4">
            <textarea
              ref={descriptionRef}
              placeholder="Descripción*"
              className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="my-2 w-1/2 lg:w-1/4">
            <button
              type="submit"
              className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
            >
              ¡Nice one!
            </button>
          </div>
          {isSubmitted && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
              ¡El juego de mesa ha sido creado exitosamente!
            </div>
          )}
          {isError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              Hubo un error al crear el juego de mesa. Por favor, inténtalo de nuevo.
            </div>
          )}
          {isDuplicate && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded-lg">
              ¡El juego de mesa ya existe! Por favor, elige un nombre diferente.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default GameboardForm;
