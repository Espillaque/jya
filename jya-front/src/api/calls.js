export const fetchGames = async () => {
  const requestOptions = {
    method: "POST", // Método POST para obtener datos
    redirect: "follow", // Configuración de redirección
  };

  try {
    const response = await fetch(
      "http://localhost:5000/games/findAll",
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    error.toString(); // Manejar errores
  }
};

export const fetchEvents = async () => {
  const requestOptions = {
    method: "POST", // Método POST para obtener datos
    redirect: "follow", // Configuración de redirección
  };

  try {
    const response = await fetch(
      "http://localhost:5000/events/findAll",
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
    // Almacenar los datos en el estado events
  } catch (error) {
    error.toString(); // Manejar errores
  }
};
