// ControlsPanel.js
import React from 'react';

const ControlsPanel = ({ 
  scene, 
  setScene, 
  weather, 
  setWeather, 
  season, 
  setSeason 
}) => {
  return (
    <div className="controls-panel">
      <div className="control-group">
        <label>Scene:</label>
        <select value={scene} onChange={(e) => setScene(e.target.value)}>
          <option value="openField">Open Field</option>
          <option value="crowdedMarket">Crowded Market</option>
          <option value="hillyTerrain">Hilly Terrain</option>
        </select>
      </div>

      <div className="control-group">
        <label>Weather:</label>
        <select value={weather} onChange={(e) => setWeather(e.target.value)}>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="snowy">Snowy</option>
        </select>
      </div>

      <div className="control-group">
        <label>Season:</label>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
          <option value="winter">Winter</option>
        </select>
      </div>
    </div>
  );
};

export default ControlsPanel;