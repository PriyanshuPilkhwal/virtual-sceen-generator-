// App.js
import React, { useState } from 'react';
import SceneDisplay from './components/SceneDisplay';
import ControlsPanel from './components/ControlsPanel';
import './App.css';

function App() {
  const [scene, setScene] = useState('openField');
  const [weather, setWeather] = useState('sunny');
  const [season, setSeason] = useState('summer');

  return (
    <div className="app">
      <ControlsPanel
        scene={scene}
        setScene={setScene}
        weather={weather}
        setWeather={setWeather}
        season={season}
        setSeason={setSeason}
      />
      <div className="scene-container">
        <SceneDisplay
          scene={scene}
          weather={weather}
          season={season}
        />
      </div>
    </div>
  );
}

export default App;