import React,{useEffect,useState} from "react";

const Lists = ({setSelectedGame}) => {

  const [selectedGameName, setSelectedGameName] = useState(null);
  const [games, setGames] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const requestOptions = {
        method: "POST", // Método POST para obtener datos
        redirect: "follow" // Configuración de redirección
      };

      try {
        const response = await fetch("http://localhost:5000/games/findAll", requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setGames(result); // Almacenar los datos en el estado games
      } catch (error) {
        error.toString(); // Manejar errores
      }
    };

    fetchGames();
  }, []);

  


  useEffect(() => {
    const fetchEvents = async () => {
      const requestOptions = {
        method: "POST", // Método POST para obtener datos
        redirect: "follow" // Configuración de redirección
      };

      try {
        const response = await fetch("http://localhost:5000/events/findAll", requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setEvents(result); // Almacenar los datos en el estado events
      } catch (error) {
        error.toString(); // Manejar errores
      } 
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const handleUseGame = (gameName) => {
    setSelectedGameName(gameName); // Guardar el nombre del juego seleccionado
    setSelectedGame(gameName); // Pasar el nombre del juego al componente PartyForm
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
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => handleUseGame(game.nombre)}>
                  Usar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md h-96 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Eventos</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <p className="text-gray-600">
                  <strong>Fecha:</strong> {formatDate(event.fecha)}
                </p>
                <p className="text-gray-600">
                  <strong>Dirección:</strong> {event.direccion}
                </p>
                <p className="text-gray-600">
                  <strong>Juego:</strong> {event.juego}
                </p>
                <p className="text-gray-600">
                  <strong>Descripción:</strong> {event.descripcion}
                </p>
                <div className="mt-2 space-x-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                    Unirse
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
