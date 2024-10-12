import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/weatherforecast')
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <ul>
          {weatherData.map((forecast, index) => (
            <li key={index}>
              {forecast.date} - {forecast.temperatureC}°C
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
