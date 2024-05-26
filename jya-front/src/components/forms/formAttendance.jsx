import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context";

const ParticipationsList = () => {
  
  const { contextData } = useContext(MyContext);
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    const fetchParticipations = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        usuario_id: contextData.id // Utiliza el ID del usuario desde el contexto
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      try {
        const response = await fetch("http://localhost:5000/participations/findAll", requestOptions);
        const result = await response.json();
        setParticipations(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchParticipations();
  }, [contextData.id]);

  const removeParticipation = (participationId) => {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id": participationId
});

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:5000/participations/delete", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">
        Eventos en los que participas:
      </h2>
      <div className="grid grid-cols-1 gap-8">
  {participations.map((participation) => (
    <div
      key={participation.id}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-lg font-semibold">
        Evento nº {participation.id}
      </h3>
      <p>
        <strong>Juego:</strong> {participation.Juego.nombre}
      </p>
      <p>
        <strong>Dirección:</strong> {participation.Evento.direccion}
      </p>
      <p>
        <strong>Descripción:</strong> {participation.Evento.description}
      </p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        onClick={() => removeParticipation(participation.id)}
      >
        Eliminar participación
      </button>
    </div>
  ))}
</div>

    </div>
  );
};

export default ParticipationsList;