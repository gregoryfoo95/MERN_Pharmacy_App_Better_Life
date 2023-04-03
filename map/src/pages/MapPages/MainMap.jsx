import React from 'react';
import MapComponent from './MapComponent';
import MarkerDetails from './Path'

function MainMap() {
  return (
    <div className="Map" style={{ width: '100vw', height: '100vh' }}>
      <MapComponent zoom={17} />
      <MarkerDetails />
    </div>
  );
}

export default MainMap;