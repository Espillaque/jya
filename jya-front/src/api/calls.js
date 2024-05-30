
// Makes an HTTP request to get all games

export const fetchGames = async () => {
  const requestOptions = {
    method: "POST", // POST method to get data
    redirect: "follow", // Redirect configuration
  };

  try {
    // fetch requests the data from the HTTP
    const response = await fetch(
      "http://localhost:5000/games/findAll",
      requestOptions,
    );
    // If it´s false, throw the error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
     // If it´s true, parse the response and return the result
    const result = await response.json();
    return result;
  } catch (error) {
    // If there is an error, convert it to a string to be displayed
    error.toString(); 
  }
};

// Makes an HTTP request to get the list of events
export const fetchEvents = async () => {
  const requestOptions = {
    method: "POST", // POST method to get data
    redirect: "follow", // Redirect configuration
  };

  try {
   // fetch requests the data from the HTTP
    const response = await fetch(
      "http://localhost:5000/events/findAll",
      requestOptions,
    );
    // If the response is false, throw the error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // If the response is true, parse it and return the result
    const result = await response.json();
    return result;
  } catch (error) {
     // If there is an error, convert it to a string to be displayed
    error.toString(); 
  }
};
