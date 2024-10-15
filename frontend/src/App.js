import React from 'react';
import Timer from './Components/Timer';
import Background from './Components/Background';
import './App.css';

function App() {
  return (
    <div className="App">
      <Background />
      <div className="timer-container">
        <Timer />
      </div>
    </div>
  );
}

export default App;