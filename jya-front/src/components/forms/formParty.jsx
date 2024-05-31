import React, { useRef, useContext } from "react";
import { MyContext } from "../../context";
import { fetchEvents, fetchGames } from "../../api/calls";

// Receives selectedGame as an argument
const PartyForm = ({ selectedGame }) => {
  // Context to manage global state
  const { appState, setAppState } = useContext(MyContext);

  // ID of the selected game from the argument
  const selectedGameId = selectedGame.id;

  // References to the form inputs
  const directionRef = useRef(null);
  const dateRef = useRef(null);
  const descriptionRef = useRef(null);

  // Function to delay execution
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Function to asynchronously load data
  const loadData = async () => {
    const newGames = await fetchGames();
    const newEvents = await fetchEvents();
    setAppState({ ...appState, games: newGames, events: newEvents });
  };

  // Handles form submission
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior and page reload.

    // Form data
    const formData = {
      gameId: selectedGameId,
      place: directionRef.current.value,
      date: dateRef.current.value,
      description: descriptionRef.current.value,
    };
    console.log("Form data:", formData);
    
    // Request headers
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Data transmitted in JSON format
    const raw = JSON.stringify({
      master_id: appState.userId,
      juego_id: formData.gameId,
      fecha: formData.date,
      direccion: formData.place,
      descripcion: formData.description,
    });

    console.log("Payload:", raw);

    // Request options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // Sending the request
    fetch("http://localhost:5000/events/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    await sleep(2000); // Makes it wait for 2 seconds
    loadData();
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-malachite-200">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl border bg-malachite-50 shadow-lg">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl">
              Organize a <br /> gathering
            </h1>
          </div>
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5"
          >
            <input
              className="w-full bg-malachite-50  mt-2 p-3 rounded-lg border border-sapphire-700 focus:outline-none focus:shadow-outline focus:border-sapphire-500"
              type="text"
              placeholder="Search in the list below*"
              value={selectedGame.name}
              disabled
            />
            <input
              name="direction"
              ref={directionRef}
              className="w-full   mt-2 p-3 rounded-lg border border-sapphire.700 focus:outline-none focus:shadow-outline focus:border-sapphire-500"
              type="text"
              placeholder="Direction*"
            />
            <input
              name="date"
              ref={dateRef}
              className="w-full   mt-2 p-3 rounded-lg border  focus:outline-none focus:shadow-outline focus:border-sapphire-500"
              type="date"
              placeholder="Date*"
            />
            <div className="col-span-2">
              <textarea
                name="description"
                ref={descriptionRef}
                placeholder="Description*"
                className="w-full h-32   mt-2 p-3 rounded-lg border border-sapphire.700 focus:outline-none focus:shadow-outline focus:border-blue-500"
              ></textarea>
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <button
                type="submit"
                className="uppercase text-sm font-bold tracking-wide text-malachite-50 bg-sapphire-500 hover:bg-sapphire-700 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
              >
                Let's Play!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartyForm;
