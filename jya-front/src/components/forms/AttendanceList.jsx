import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context";

const ParticipationsList = () => {
  // Access state from Mycontext
  const { appState } = useContext(MyContext);
  //Define local state to store
  const [participations, setParticipations] = useState([]);

  //Asynchronous function to fetch user participations
  const fetchParticipations = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Request payload with the user ID
    const raw = JSON.stringify({
      usuario_id: appState.userId,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      //Fetch to get the participations
      const response = await fetch(
        "http://localhost:5000/participations/findAll",
        requestOptions,
      );
      //Parse the response as JSON
      const result = await response.json();
      //Update state with new data
      setParticipations(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //useEffect to execute the function when the component mounts or when the user ID changes
  useEffect(() => {
    //call the fetchParticipations function
    fetchParticipations();
  }, []);

  //Function to remove participation
  const removeParticipation = async (participationId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Request payload with the participation ID
    const raw = JSON.stringify({
      id: participationId,
    });
    //Request options
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    //fetch to delete participation
    await fetch("http://localhost:5000/participations/delete", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    await fetchParticipations();
  };

  return (
    <div className="w-full px-4 py-8 bg-malachite-100 ">
      <h2 className="text-2xl font-semibold mb-4">
      Events you are participating in:
      </h2>
      {participations.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="border border-sapphire-700 p-4 rounded-lg text-center">
          You have not joined any events.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {participations.map((participation) => (
            <div
              key={participation.id}
              className="p-6 rounded-lg shadow-md space-y-4 bg-malachite-50"
            >
              <h3 className="text-lg font-semibold">
                Event nº {participation.id}
              </h3>
              <p>
                <strong>Game:</strong> {participation.Juego.nombre}
              </p>
              <p>
                <strong>Direction:</strong> {participation.Evento.direccion}
              </p>
              <p>
                <strong>Description:</strong> {participation.Evento.descripcion}
              </p>

              <button
                className="px-4 py-2 bg-red-100 text-malachite-700 rounded hover:bg-red-200"
                onClick={() => removeParticipation(participation.id)}
              >
                Delete attendance
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipationsList;
