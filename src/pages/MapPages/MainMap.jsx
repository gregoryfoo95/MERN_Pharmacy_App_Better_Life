import React from 'react';
import MapComponent from './MapComponent';
import MarkerDetails from './Path'
import Directions from './Directions';

function MainMap() {
  return (
    <div className="Map" style={{ width: '80vw', height: '80vh' }}>
      <MapComponent zoom={17} />
      <MarkerDetails />
    </div>
  );
}

export default MainMap;