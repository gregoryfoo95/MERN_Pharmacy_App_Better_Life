import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMap from './pages/MapPages/MainMap';
import MainSplit from './pages/UserMain/MainSplit';
import Directions from './pages/MapPages/Directions';

function App() {
  return (
    <div className="The Watson's Experience" style={{ width: '100vw', height: '100vh' }}>
      
      <Router>
        <Routes>
          <Route path="/" element={<MainSplit />} />
          <Route path="/map" element={<MainMap />} />
          <Route path="/map/:id" element={<Directions />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

