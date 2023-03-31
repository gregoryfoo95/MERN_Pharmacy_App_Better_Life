import React from 'react';
import './App.css';
import MapComponent from './components/MapComponent';

function App() {
  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <MapComponent zoom={17} />
    </div>
  );
}

export default App;
