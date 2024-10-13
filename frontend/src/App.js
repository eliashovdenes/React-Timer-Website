import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pokemonData, setPokemonData] = useState(null);

  // const apiUrl = process.env.NODE_ENV === 'production' 
  // ? 'http://localhost:5165/PokemonTypes'  // When accessed via browser, use localhost
  // : 'http://backend/PokemonTypes';         // Inside Docker, containers can talk to each other

  // const apiUrl = process.env.NODE_ENV !== 'production' 
  // ? 'http://localhost:5165/PokemonTypes'  // When accessed via browser locally
  // : 'http://backend/PokemonTypes';  // Inside Docker (if you switch back to Docker)



  // const apiUrl = 'http://backend/PokemonTypes';

  // const apiUrl = 'http://localhost:5000/PokemonTypes';

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/PokemonTypes';


  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setPokemonData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        console.log('API URL:', apiUrl);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log('Response error data:', error.response.data);
          console.log('Response error status:', error.response.status);
          console.log('Response error headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error setting up request:', error.message);
        }
      });
  }, [apiUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Pokemon</h1>
          {pokemonData ? (
            <div>
              <p>Pokémon: {pokemonData.name}</p>
              <p>Types: {pokemonData.types.join(', ')}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
      </header>
    </div>
  );
}

export default App;
