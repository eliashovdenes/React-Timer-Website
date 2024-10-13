import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [pokemonData, setPokemonData] = useState(null);

  // Local
  const apiUrl = 'http://localhost:5165/PokemonTypes'


  // With docker
  // const apiUrl = 'http://localhost:5000/PokemonTypes'

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
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
            <p className="pokemon-text">Types: {pokemonData.types.join(', ')}</p>
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;