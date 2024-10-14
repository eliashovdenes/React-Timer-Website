import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [pokemonData, setPokemonData] = useState(null);

  // Use the environment variable for the backend API URL
  // const apiUrl = process.env.REACT_APP_API_URL; 

  const apiUrl = "https://seahorse-app-wn5zq.ondigitalocean.app/eliashovdenes-mydotnetbackend/Pokemontypes"

  // const apiUrl = process.env.REACT_APP_API_URL;
  console.log('API URL:', process.env.REACT_APP_API_URL);

  console.log('All env variables:', process.env);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        console.log('Received data:', response.data);
        setPokemonData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Random Pokemon</h1>
        {pokemonData ? (
          <div className="pokemon-container">
            <p className="pokemon-text">Pokémon: {pokemonData.name}</p>
            {pokemonData.types ? (
              <p className="pokemon-text">Types: {pokemonData.types.join(', ')}</p>
            ) : (
              <p className="pokemon-text">Types: Unknown</p>
            )}
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
